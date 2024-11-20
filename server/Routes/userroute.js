const express = require('express');
const { loginuser, registeruser } = require('../Controllers/usercontroller');
const userrouter = express.Router();

userrouter.post('/register', registeruser);
userrouter.post('/login', loginuser);

module.exports = { userrouter };
