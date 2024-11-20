import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import './TopDoctors.css';
import {doctors} from '../../assets/assets';
import { Link } from 'react-router-dom';
const TopDoctors = () => {
    const navigate=useNavigate();
    const handleDoctorClick = (id) => {
        navigate(`/doctor/${id}`); 
      };
  return (
    <div className="doctors">
        <h1>Top Doctors to BOOK </h1>
        <p>Expert care begins with the right specialist. Find your trusted doctor and take a step towards better health today.</p>
        <p></p>
        <div className="topdoctors-list">
           {
            doctors.slice(0,10).map((item,index)=>{
                return( 
                    <div id={index} className="top-doctors-item" onClick={()=>handleDoctorClick(item.id)}>
                    <img src={item.image} alt={item.name} />
                    <p className={`availability ${item.available ? 'available' : 'not-available'}`}>
                            <span className="dot"></span>
                            {item.available ? 'Available' : 'Not Available'}
                        </p>
                    <h3>{item.name}</h3>
                    <h2>{item.speciality}</h2>
                    </div>
                
                   
                )
            })
            
           }
        </div>
        <button className="btn" onClick={()=>navigate('/Doctors')}>More</button>
    </div>
  )
}

export default TopDoctors