const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    doctorname: {
        type: String,
        required: true,
    },
    doctorid: {
        type: String,
        required: true,
        unique: true,  // Ensuring the doctor ID is unique
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensuring the email is unique
    },
    password: {
        type: String,
        required: true,
    }
});

// Mongoose will automatically create the model with the name "Doctor"
module.exports = mongoose.model('Doctor', DoctorSchema);
