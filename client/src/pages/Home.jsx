import React from 'react'
import Header from '../components/Header/Header';
import Speciality from './speciality/speciality';
import TopDoctors from './TopDoctors/TopDoctors';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
const Home = () => {
  return (
    <div>
        <Header/>
        <Speciality/>
        <TopDoctors/>
        <Banner/>
        <Footer/>
    </div>
  )
}

export default Home;