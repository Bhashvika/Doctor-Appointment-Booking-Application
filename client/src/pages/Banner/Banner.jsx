import React from 'react'
import './Banner.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='banner'>
        <div className="banner-left">
                <h1>Book Appointment with 100+ Trusted Doctors.</h1>
                <button  className="create-account-button" onClick={()=>{navigate('/login')}}>CreateAccount</button>
        </div>
        <div className="banner-right">
               <img src={assets.appointment_img} alt=''/>
        </div>
    </div>
  )
}

export default Banner