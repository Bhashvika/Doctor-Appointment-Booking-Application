const express = require('express');
const multer = require('multer');
const path = require('path');
const { addDoctor, listDoctors, removeDoctor } = require('../Controllers/AddController');
const AddDoctorRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));  // Correct destination path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Save file with unique name
    }
});

const upload = multer({ storage: storage });

AddDoctorRouter.post('/adddoctors', upload.single('Image'), addDoctor);  // Handles image upload
AddDoctorRouter.get('/listdoctors', listDoctors);
AddDoctorRouter.post('/removeDoctor', removeDoctor);

module.exports = AddDoctorRouter;
