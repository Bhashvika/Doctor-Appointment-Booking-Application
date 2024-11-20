const DoctorModel = require('../models/Doctormodel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const doctorlogin = async (req, res) => {
  try {
    const { doctorid, password } = req.body;
    const Doctor = await DoctorModel.findOne({ doctorid });
    if (!Doctor) {
      return res.status(500).json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, Doctor.password);
    if (!isMatch) {
      return res.status(500).json({ success: false, message: "Password does not match" });
    }
    const doctortoken = createToken(Doctor._id);
    res.json({ success: true, token: doctortoken,doctorname:Doctor.doctorname,role: "doctor"});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

const DoctorRegister = async (req, res) => {
  try {
    const { doctorname, doctorid, email, password } = req.body;
    const Doctorexist = await DoctorModel.findOne({ doctorid });
    if (Doctorexist) {
      return res.status(500).json({ success: false, message: "Doctor already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(500).json({ success: false, message: "Enter a valid email address" });
    }
    if (password.length < 8) {
      return res.status(500).json({ success: false, message: "Password must contain at least 8 characters" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const Doctor = new DoctorModel({
      doctorname: doctorname,
      doctorid: doctorid,
      email: email,
      password: hashedPassword,
    });
    const savedDoctor = await Doctor.save();
    const doctortoken = createToken(savedDoctor._id);
    res.json({ success: true, token: doctortoken });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "An error occurred during registration" });
  }
};

module.exports = { DoctorRegister, doctorlogin };
