import React from 'react'
import './About.css';
import Footer from '../pages/Footer/Footer'
const About = () => {
  return (
    <>
    <div class="container">
        <div className="section">
            <h2 className='h1'>WELCOME TO MEDIMEET</h2>
            <p>Your trusted online platform for hassle-free doctor appointments. We are dedicated to simplifying the process of finding the right healthcare professional for you and your loved ones. Our mission is to bridge the gap between doctors and patients by providing an efficient and user-friendly solution.</p>
        </div>
        <div className="section">
            <h2 className='h2'>FACILITIES PROVIDED BY US??</h2>
            <ul>
                <li><strong>Easy Booking:</strong> Schedule appointments with just a few clicks, anytime, anywhere.</li>
                <li><strong>Trusted Doctors:</strong> Access a wide range of certified and experienced healthcare professionals.</li>
                <li><strong>Detailed Profiles:</strong> View comprehensive doctor profiles, including their specialties, qualifications, and patient reviews.</li>
                <li><strong>Seamless Experience:</strong> Our intuitive interface ensures a smooth and effortless booking process.</li>
            </ul>
        </div>
        <div className="section">
            <h2 className='h2'>How It Works</h2>
            <ol>
                <li><strong>Search for Doctors:</strong> Browse through our list of doctors based on specialties, location, and availability.</li>
                <li><strong>View Details:</strong> Check doctor profiles, including their experience, certifications, and consultation fees.</li>
                <li><strong>Book Appointment:</strong> Select your preferred time slot and confirm your appointment instantly.</li>
                <li><strong>Receive Confirmation:</strong> Get instant confirmation and reminders about your upcoming appointment.</li>
            </ol>
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default About;