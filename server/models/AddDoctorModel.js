const mongoose = require('mongoose');

const AddDoctorSchema = mongoose.Schema({
    DoctorId: { type: Number, required: true, unique: true },
    Available: { type: Boolean, required: true },
    Address: { type: String, required: true },
    Doctorname: { type: String, required: true },
    Description: { type: String, required: true },
    AppointmentFee: { type: String, required: true },
    Speciality: { type: String, required: true },
    Degree: { type: String, required: true },
    Experience: { type: String, required: true },
    Image: { type: String, required: false }, // Store image path (no longer required: true)
});

const AddDoctorModel = mongoose.model("AddDoctorModel", AddDoctorSchema);
module.exports = AddDoctorModel;
