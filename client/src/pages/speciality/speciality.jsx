import React from 'react'
import { specialityData } from '../../assets/assets'
import { Link } from 'react-router-dom';
import './speciality.css'
const speciality = () => {
  return (
    <div id='speciality' className='speciality'>
        <h2>Find By Speciality </h2>
        <p>Finding the right doctor begins with understanding their specialty, where expertise meets care.</p>
        <div className="speciality-container">
           { specialityData.map((item,index)=>(
                 <Link  key={index} to={`/Doctors/${item.speciality}`}>
                    <img className="item-image" src={item.image} alt="" />
                    <p>{item.speciality}</p>
                 </Link>
           ))
        }
        </div>
    </div>
  )
}

export default speciality