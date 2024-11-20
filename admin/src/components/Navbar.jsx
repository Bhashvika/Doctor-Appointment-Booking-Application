import React from 'react'
import './Navbar.css';
import { assets } from '../assets/assets';
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className='navbar'>
        <div className="nav-left">
            <img src={assets.logo} alt="" />
        </div>
        <div className="nav-middle">
        <Link to="/add" className="link">
          <p>Add Doctors</p>
        </Link>
        <Link to="/list" className="link">
          <p>List Doctors</p>
        </Link>
        <Link to="/Appointments" className="link">
          <p>Appointments</p>
        </Link>
        </div>
        <div className="nav-right">
            <img src={assets.profile} alt="" />
        </div>
    </div>
    <hr className='hr'/>
    </>
    

  )
}

export default Navbar