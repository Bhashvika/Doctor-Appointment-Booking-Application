const usermodel=require('../models/usermodel');
const bcrypt = require('bcrypt');
const validator=require('validator');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);
    console.log("Generated Token:", token); // Debugging token output
    res.json({ success: true, token ,role:"user"});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const registeruser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exist = await usermodel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new usermodel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    const token = createToken(savedUser._id);
    console.log("Generated Token on Registration:", token); // Debugging token output
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { loginuser, registeruser };
