import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="maincontent">
            <img src={assets.logo} alt=""/>
            <p>MediMeet is a comprehensive healthcare platform connecting patients with top specialists for expert care, easy appointment booking, and personalized health solutions.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <hr className='hr'/>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/doctors">Top Doctors</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <hr className='hr'/>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Medimeet. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
