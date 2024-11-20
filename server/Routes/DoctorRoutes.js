const {DoctorRegister,doctorlogin}=require('../Controllers/DoctorController');
const express = require('express');
const Doctorrouter = express.Router();
Doctorrouter.post('/Doctorregister', DoctorRegister);
Doctorrouter.post('/Doctorlogin', doctorlogin);
module.exports = {Doctorrouter};
