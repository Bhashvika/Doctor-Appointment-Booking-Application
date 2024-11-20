// Booking.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js';
const Booking = () => {
    const location = useLocation();
    const { doctor, selectedDate } = location.state || {}; // Retrieve doctor and date from location state

    const [data, setData] = useState({
        name: "",
        age: "",
        phone: "",
        doctorName: doctor ? doctor.name : "",
        doctorspeciality:doctor ? doctor.speciality:"",
        date: selectedDate || "",
        amount: doctor ? doctor.fees : ""
    });

    // Handle input changes
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const PayAmount = async (e) => {
        e.preventDefault();
        
        const stripe = await loadStripe("pk_test_51PH0D9SGNgig8mk2ajUatTa2IGERZ82AJxWJB5EVKcPOPYooBeTNxaLyhM21JiceuBT0JMEt0zxBnaVtLoRauXTT00P95Og4ak");
        
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post("http://localhost:4000/api/booking", data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Check if sessionId is received correctly
            const sessionId = response.data.sessionId;
            if (!sessionId) {
                throw new Error("Failed to retrieve sessionId from backend");
            }
    
            // Redirect to Stripe checkout page
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result.error) {
                console.error("Stripe checkout error:", result.error.message);
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
        }
    };
    
    return (
        <div className="booking-container">
            <h2>Booking Form</h2>
            <form onSubmit={PayAmount} className="booking-form">
                <label>Patient Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Your name" 
                    required 
                    value={data.name}
                    onChange={onHandleChange}
                />
                
                <label>Age:</label>
                <input 
                    type="number" 
                    name="age" 
                    placeholder="Your Age"  
                    required 
                    value={data.age}
                    onChange={onHandleChange}
                />
                
                <label>Phone:</label>
                <input 
                    type="number" 
                    name="phone" 
                    placeholder="Your Phone" 
                    required 
                    value={data.phone}
                    onChange={onHandleChange}
                />
                
                <label>Doctor Name:</label>
                <input 
                    type="text" 
                    name="doctorName" 
                    placeholder="Doctor's Name" 
                    value={data.doctorName}
                    readOnly
                />
                <label>Doctor Speciality:</label>
                <input 
                    type="text" 
                    name="doctorSpeciality" 
                    placeholder="Doctor's Speciality" 
                    value={data.doctorspeciality}
                    readOnly
                />
                
                <label>Appointment Date:</label>
                <input 
                    type="text" 
                    name="date" 
                    placeholder="Appointment Date" 
                    value={data.date}
                    readOnly
                />
                
                <label>Amount:</label>
                <input 
                    type="number" 
                    name="amount" 
                    placeholder="Appointment Fee" 
                    value={data.amount}
                    readOnly
                />
                
                <button type="submit">Pay</button>
            </form>
        </div>
    );
};

export default Booking;
