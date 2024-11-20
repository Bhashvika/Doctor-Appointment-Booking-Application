const express = require('express');
const router = express.Router();
const { createBookingAndCheckoutSession, getUserAppointments, deleteAppointment,getDoctorAppointments,getAppointments } = require('../Controllers/Bookincontroller');
const verifyToken = require('../middleware/verifyToken');

router.post('/booking', verifyToken, createBookingAndCheckoutSession);
// Route in your `routes/doctor.js` or similar
router.get("/doctor-appointments/:doctorName", getDoctorAppointments);

// Route to get user appointments (with token verification)
router.get('/user-appointments', verifyToken, getUserAppointments);
router.get('/allappointments',getAppointments)
// Route to delete an appointment by booking ID (with token verification)
router.delete('/appointments/:bookingId', verifyToken, deleteAppointment);

module.exports = router;
