import React, { useEffect,useState } from 'react'
import { doctors } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Doctors.css';
const Doctors = () => {
  const navigate=useNavigate();
  const {speciality}=useParams();
  const [filteredDoctors,setFilteredDoctors]=useState([]);
  useEffect(()=>{
    if(speciality){
    const doctorbyspeciality=doctors.filter(doctor=>doctor.speciality===speciality);
    setFilteredDoctors(doctorbyspeciality);
}
else{
setFilteredDoctors(doctors)
}},[speciality])
const handleDoctorClick = (id) => {
  navigate(`/doctor/${id}`); 
};
  return (
    <div>
      <h2 className='h2'>{speciality?`Doctors specializing in ${speciality}`:"All Doctors to Book"}</h2>
      <div className="doctor-container">
        {
          filteredDoctors.map((doctor,index)=>(
            <div key={index}  onClick={()=>handleDoctorClick(doctor.id)} className="doctor-card">
              <img  src={doctor.image} alt={doctor.name} />
              <p>{doctor.name}</p>
              <p>{doctor.speciality}</p>
              <p className={`availability ${doctor.available ? 'available' : 'not-available'}`}>
                            <span className="dot"></span>
                            {doctor.available ? 'Available' : 'Not Available'}
                        </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Doctors;