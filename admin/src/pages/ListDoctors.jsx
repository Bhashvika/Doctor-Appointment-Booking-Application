import React, { useEffect, useState } from 'react'
import './ListDoctors.css'
import axios from 'axios'
import {toast} from "react-toastify"
const ListDoctors= () => {
  const url="http://localhost:4000";
  const [list,setList]=useState([])
  const fetchList=async ()=>{
    const  response=await axios.get(`${url}/api/listdoctors`);
    console.log(response.data);
    if(response.data.success){
      setList(response.data.data)
    }
    else{
        toast.error("Error")
    }
  }
  useEffect(()=>{
     fetchList();
  },[])
  const removeDoctor=async(doctorId)=>{
         const response=await axios.post(`${url}/api/removeDoctor`,{id:doctorId})
         await fetchList();
         if(response.data.success){
          toast.success(response.data.message)
         }
         else{
          toast.error("Error")
         }
  }
  return (
    <div className='list'>
           <p>Available Doctors..</p>
           <div className='list-table'>
            <div className='list-table-format title'>
              <b>Image</b>
              <b>DoctorId</b>
              <b>Name</b>
              <b>Speciality</b>
              <b>Degree</b>
              <b>AppointmentFee</b>
              <b>Remove Doctor</b>
              
            </div>
            {list.map((item,index)=>{
               return(
                <div key={index} className='list-table-format '>
                  <img src={`${url}/images/`+item.Image} alt=""  />
                  <p>{item.DoctorId}</p>
                  <p>{item.Doctorname}</p>
                  <p>{item.Speciality}</p>
                  <p>{item.Degree}</p>
                  <p>Rs.{item.AppointmentFee}</p>
                  <p className='cursor' onClick={()=>removeDoctor(item._id)}>x</p>
                  </div>
               )
            })}
           </div>
    </div>
  )
}

export default ListDoctors;