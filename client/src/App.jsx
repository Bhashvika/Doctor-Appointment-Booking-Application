import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors/Doctors';
import About from './pages/About';
import Login from './pages/Login';
import Appointements from './pages/Appointements';
import MyAppointments from './pages/MyAppointments';
import Navbar from './components/Navbar/Navbar';
import Contact from './pages/Contact';
import DoctorDetails from './pages/DoctorDetails';
import Booking from './pages/Booking/Booking';
import PaymentSuccess from './pages/PaymentSuccess';
import DoctorLogin from './pages/DoctorLogin';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/Doctors' element={<Doctors/>}/>
      <Route path='/Doctors/:speciality' element={<Doctors/>}/>
      <Route path='/doctor/:id' element={<DoctorDetails/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/My-appointment' element={<MyAppointments/>}/>
      <Route path='/Appointment/:docId' element={<Appointements/>}/>
      <Route path='/Booking' element={<Booking/>}/>
      <Route path='/Booking/payment-success' element={<PaymentSuccess/>}/>
      <Route path='/DoctorLogin' element={<DoctorLogin/>}/>
    </Routes>
    
    </div>
  )
}

export default App;