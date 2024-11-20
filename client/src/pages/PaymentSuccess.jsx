// PaymentSuccess.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccess.css';  // Import the CSS file

const PaymentSuccess = () => {
  const location = useLocation();
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    // Get the bookingId from the URL query parameters
    const params = new URLSearchParams(location.search);
    const id = params.get('bookingId');
    setBookingId(id);
  }, [location]);

  return (
    <div className="payment-success-container">
      <h1>Payment Successful!</h1>
      <p>Your booking has been confirmed.</p>
      {bookingId && (
        <div className="booking-id">
          <p>Booking ID: {bookingId}</p>
        </div>
      )}
      {/* Add more content or a button to go back to the homepage */}
      <button onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
};

export default PaymentSuccess;
