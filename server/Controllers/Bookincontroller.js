const BookingModel = require('../models/Bookingmodel');
const Stripe = require('stripe');
require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173"; 
const createBookingAndCheckoutSession = async (req, res) => {
    try {
        const userId = req.user.id; 
        const newBooking = await BookingModel.create({
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            doctorName: req.body.doctorName,
            doctorspeciality:req.body.doctorspeciality,
            date: req.body.date,
            amount: req.body.amount,
            userId: userId 
        });
        const lineItems = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Appointment with Dr. ${req.body.doctorName}`,
                        description: `Patient: ${req.body.name}, Date: ${req.body.date}`,
                    },
                    unit_amount: req.body.amount * 100, 
                },
                quantity: 1,
            }
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontend_url}/Booking/payment-success?bookingId=${newBooking._id}`,
            cancel_url: `${frontend_url}/Booking/cancel?bookingId=${newBooking._id}`,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, message: "Failed to create booking and payment session." });
    }
};
const getUserAppointments = async (req, res) => {
    try {
      const userId = req.user.id; 
      const appointments = await BookingModel.find({ userId });
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching user appointments:", error);
      res.status(500).json({ success: false, message: "Failed to fetch appointments." });
    }
  };
const deleteAppointment=async (req,res)=>{
    try{
        const {bookingId}=req.params;
        const deletebooking=await BookingModel.findByIdAndDelete(bookingId);
        if(!deletebooking){
            res.status(404).json({success:false,message:"appointment not found"});
        }
        res.status(200).json({success:true,message:"appointment deleted successfully"});
    }
    catch(error){
        console.error("Error deleting appointment:", error);
        res.status(500).json({ success: false, message: "Failed to delete appointment. Please try again later." });
    }
}
const getDoctorAppointments = async (req, res) => {
    const doctorName = req.params.doctorName;  // Getting the doctor's name from the URL parameter

    try {
        // Find all appointments where the doctorName matches
        const appointments = await BookingModel.find({ doctorName });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found for this doctor." });
        }

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching appointments." });
    }
};
const getAppointments = async (req, res) => {
    try {
        // Fetch all appointments
        const appointments = await BookingModel.find({});
        
        // Check if no appointments are found
        if (appointments.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found" });
        }

        // Return appointments if found
        return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        // Catch unexpected errors
        console.error("Error fetching appointments:", error.message);
        return res.status(500).json({ success: false, message: "Failed to get appointments" });
    }
};


module.exports = { createBookingAndCheckoutSession, getUserAppointments,deleteAppointment,getDoctorAppointments,getAppointments};