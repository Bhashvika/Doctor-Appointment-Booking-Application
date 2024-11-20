import React, { useState, useEffect } from 'react';
import './DoctorDetails.css';
import { doctors } from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorDetails = () => {
    const { id } = useParams();
    const doctor = doctors.find(e => e.id === Number(id));
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [weekDates, setWeekDates] = useState([]);

    // Generate a week's worth of dates
    useEffect(() => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        setWeekDates(dates);
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date.toLocaleDateString());
    };

    if (!doctor) {
        return <div>Doctor not found</div>;
    }

    const handleBooking = () => {
        navigate('/Booking', {
            state: {
                doctor,
                selectedDate
            }
        });
    };

    return (
        <div>
            <h2 className='h2'>BOOK YOUR APPOINTMENT</h2>
            <div className='doctor-details'>
                <div className="doctor-image">
                    <img src={doctor.image} alt={doctor.name} />
                </div>
                <div className="doctor">
                    <h2>{doctor.name}</h2>
                    <p>{doctor.about}</p>
                    <p>Speciality: {doctor.speciality}</p>
                    <div className="degree">
                        <h3>Degree: {doctor.degree}</h3>
                        <h3>Experience: {doctor.experience}</h3>
                    </div>
                    <h4>Fee: ${doctor.fees}</h4>
                    <h4>Address: {doctor.address.line1}, {doctor.address.line2}</h4>
                    <div className="date-blocks">
                        {weekDates.map((date, index) => (
                            <div 
                                key={index} 
                                className={`date-block ${selectedDate === date.toLocaleDateString() ? 'selected' : ''}`} 
                                onClick={() => handleDateSelect(date)}
                            >
                                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                        ))}
                    </div>

                    <button onClick={handleBooking} className="btn">
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
