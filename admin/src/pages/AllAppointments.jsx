import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllAppointments.css';

const AllAppointments = () => {
    const [appointments, setAppointments] = useState([]); // Store appointments
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch appointments from the API
    const fetchAppointments = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get('http://localhost:4000/api/allappointments');
            
            if (response.data.success) {
                setAppointments(response.data.data); // Set data if successful
            } else {
                setError('Failed to load appointments'); // Handle API failure
            }
        } catch (err) {
            setError('An error occurred while fetching appointments'); // Catch unexpected errors
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Use effect to fetch appointments on component mount
    useEffect(() => {
        fetchAppointments();
    }, []); // Empty dependency array ensures this runs once

    return (
        <div className="appointments-container">
            <h2>All Appointments</h2>
            {loading && <p className="message">Loading appointments...</p>} {/* Show loading state */}
            {error && <p className="message" style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
            {!loading && appointments.length === 0 && <p className="message">No appointments found.</p>} {/* Show when no data */}
            
            {appointments.length > 0 && (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>Appointment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((item) => (
                            <tr key={item._id}> {/* Use a unique identifier like _id */}
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.phone}</td>
                                <td>{item.doctorName}</td>
                                <td>{item.doctorspeciality}</td>
                                <td>{new Date(item.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllAppointments;
