import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Utility to check token expiration
  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true; // If decoding fails, assume token is invalid
    }
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login"); // Redirect to login
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/user-appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(response.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel Appointment
  const handleCancelAppointment = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        setError("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:4000/api/appointments/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state after deletion
      setAppointments(appointments.filter((appointment) => appointment._id !== bookingId));
    } catch (err) {
      console.error("Error canceling appointment:", err);
      setError("Failed to cancel the appointment. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-appointments-container">
      <h1>My Bookings</h1>
      {appointments.length === 0 ? (
        <p className="no-appointments">You have no upcoming appointments.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Appointment Date</th>
              <th>Doctor Fee</th>
              <th>Status</th>
              <th>Cancel Booking</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.doctorName}</td>
                <td>{appointment.doctorspeciality}</td>
                <td>{appointment.date}</td>
                <td>${appointment.amount}</td>
                <td style={{ color: "green", fontWeight: "bold" }}>PAID</td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCancelAppointment(appointment._id)}
                >
                  ❌
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
