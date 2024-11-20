const fs = require('fs');
const path = require('path');
const AddDoctorModel = require('../models/AddDoctorModel');

const addDoctor = async (req, res) => {
    try {
        const { DoctorId, Available, Address, Doctorname, Description, AppointmentFee, Speciality, Degree, Experience } = req.body;
        const image = req.file ? req.file.filename : null;  // Getting the filename from multer

        if (!DoctorId || !Available || !Address || !Doctorname || !Description || !AppointmentFee || !Speciality || !Degree || !Experience || !image) {
            return res.status(400).json({ error: 'All fields are required, including the image' });
        }

        // Create a new doctor record
        const newDoctor = new AddDoctorModel({
            DoctorId,
            Available,
            Address,
            Doctorname,
            Description,
            AppointmentFee,
            Speciality,
            Degree,
            Experience,
            Image: image,  // Save image path here
        });

        // Save the record to the database
        await newDoctor.save();

        res.status(201).json({ message: 'Doctor added successfully', data: newDoctor, success: true });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const listDoctors = async (req, res) => {
    try {
        const doctors = await AddDoctorModel.find({});
        res.json({ success: true, data: doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching doctors" });
    }
};

const removeDoctor = async (req, res) => {
    try {
        const id = req.body.id;
        const doctor = await AddDoctorModel.findById(id);
        if (doctor) {
            const imagePath = path.join(__dirname, '../uploads', doctor.Image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            await AddDoctorModel.findByIdAndDelete(id);
            res.json({ success: true, message: "Doctor removed" });
        } else {
            res.json({ success: false, message: "Doctor not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing doctor" });
    }
};

module.exports = { addDoctor, listDoctors, removeDoctor };
