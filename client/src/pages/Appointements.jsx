import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointments.css';  // Create a separate CSS file for styling

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get doctor's name from localStorage
    const doctorName = localStorage.getItem('DoctorName');  // Correct key for localStorage

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!doctorName) {
                setError('Doctor is not logged in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/api/doctor-appointments/${doctorName}`);
                const fetchedAppointments = response.data.appointments;  // Assuming response data structure is { appointments: [...] }

                // Sort appointments by date (ascending)
                fetchedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

                // Adjust appointment time by adding 30 minutes gap if they're on the same day
                let adjustedAppointments = [];
                let lastAppointmentDate = null;

                fetchedAppointments.forEach((appointment, index) => {
                    if (lastAppointmentDate) {
                        const prevDate = new Date(lastAppointmentDate);
                        const currDate = new Date(appointment.date);
                        if (prevDate.toDateString() === currDate.toDateString()) {
                            // Add 30 minutes gap to the current appointment
                            currDate.setMinutes(currDate.getMinutes() + 30);
                            appointment.date = currDate;
                        }
                    }
                    lastAppointmentDate = appointment.date;
                    adjustedAppointments.push(appointment);
                });

                setAppointments(adjustedAppointments);
            } catch (err) {
                setError('Failed to load appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [doctorName]);

    if (loading) return <div>Loading appointments...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="appointments-container">
            <h2 style={{textAlign:"center", fontSize:"25px"}}>Appointments for {doctorName}</h2>
            {appointments.length > 0 ? (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Appointment Date</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.name}</td>
                                <td>{appointment.age}</td>
                                <td>{appointment.phone}</td>
                                <td>{new Date(appointment.date).toLocaleString()}</td>
                                <td style={{color:"green"}}>PAID</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default Appointments;
