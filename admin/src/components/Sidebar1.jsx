import React from "react";
import "./sidebar.css";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Sidebar = () => { // Ensure correct casing
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <Link to="/add" className="sidebar-option">
          <img src={assets.add} alt="Add Icon" width="25px" />
          <p>Add Doctors</p>
        </Link>
        <Link to="/list" className="sidebar-option">
          <img src={assets.list} alt="List Icon" width="30px" />
          <p>List Doctors</p>
        </Link>
        <Link to="/Appointments" className="sidebar-option">
          <img src={assets.Appointment} alt="Appointments Icon" width="30px" />
          <p>Appointments</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
