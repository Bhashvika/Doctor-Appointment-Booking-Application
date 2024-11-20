const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  doctorName: String,
  doctorspeciality:String,
  date: String, // e.g., 'MM/DD/YYYY'
  amount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
