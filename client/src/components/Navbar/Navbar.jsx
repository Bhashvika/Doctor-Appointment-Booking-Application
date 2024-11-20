import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Navbar.css';
const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('Home');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loginDropdown, setLoginDropdown] = useState(false); // State for login dropdown
  
  const token = localStorage.getItem('token'); // Check for normal user token
  const doctortoken = localStorage.getItem('Doctortoken'); // Check for doctor token

  const handleLogout = () => {
    // Remove relevant token and role from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('Doctortoken');
    localStorage.removeItem('role');
    navigate("/Login"); // Redirect to login page
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdown(!loginDropdown);
  };

  const handleLoginNavigation = (path) => {
    navigate(path);
    setLoginDropdown(false); 
  };

  return (
    <div className="navbar-container">
      <img src={assets.logo} alt="" className="navbar-logo" />
      <div className="navbar-links">
        <Link to="/" onClick={() => setMenu('Home')} className={menu === 'Home' ? "active" : ""}>Home</Link>
        <Link to="/Doctors" onClick={() => setMenu('Doctors')} className={menu === 'Doctors' ? "active" : ""}>Doctors</Link>
        <Link to="/About" onClick={() => setMenu('About')} className={menu === 'About' ? "active" : ""}>About</Link>
      </div>
      <div className="profile-section">
        {
          token || doctortoken ? (
            <div className="profile-menu">
              {token &&( <img src={assets.profile_pic} alt="" className="profile-pic" />)}
              {doctortoken && (<img src={assets.profile} alt="" className='profile-pic1'/>)}
              <img src={assets.dropdown_icon} alt="" className="dropdown-icon" />
              <div className="dropdown-menu">
                {/* Conditionally render dropdown items based on the token type */}
                {token && (
                  <Link to="/My-appointment" className="dropdown-item">My Appointments</Link> // For normal users
                )}
                {doctortoken && (
                  <p className="dropdown-item" onClick={handleLogout}>Logout</p> // Only show "Logout" for doctors
                )}
                {/* Show logout for both users and doctors */}
                {(!doctortoken) && (
                  <p className="dropdown-item" onClick={handleLogout}>Logout</p>
                )}
              </div>
            </div>
          ) : (
            <div className="login-section">
              <button onClick={toggleLoginDropdown} className="login-button">Login</button>
              {loginDropdown && (
                <div className="login-dropdown-menu">
                  <button onClick={() => handleLoginNavigation("/DoctorLogin")} className="dropdown-item">Doctor Login</button>
                  <button onClick={() => handleLoginNavigation("/Login")} className="dropdown-item">User Login</button>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Navbar;
