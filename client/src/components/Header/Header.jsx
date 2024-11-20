import React from 'react';
import { assets } from '../../assets/assets';
import './Header.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const naviagate=useNavigate();
  return (
    <div className="header-container">
      {/* Left */}
      <div className="header-left">
        <p className="header-title">Your health is our priority. Book your appointment today for a healthier tomorrow.</p>
        <div className="header-subtitle">
          <img className="profile-image" src={assets.group_profiles} alt="" />
          <p>In every consultation, we bring expertise, care, and trust. Your well-being is in safe hands</p>
        </div>
        <a href="#speciality" className="appointment-button" onClick={()=>naviagate('/Doctors')}>
          Book Appointment <img className="arrow-icon" src={assets.arrow_icon} />
        </a>
      </div>
      {/* Right */}
      <div className="header-right">
        <img className="header-image" src={assets.header_img} />
      </div>
    </div>
  );
}

export default Header;
