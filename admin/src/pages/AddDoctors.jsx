import React, { useState } from "react";
import axios from "axios";
import "./AddDoctors.css";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const AddDoctors = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        DoctorId: "",
        Available: "",
        Address: "",
        Doctorname: "",
        Speciality: "Neurologist",
        Degree: "",
        Experience: "",
        Description: "",
        AppointmentFee: "",
    });

    const onchangehandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("DoctorId", data.DoctorId);
        formData.append("Doctorname", data.Doctorname);
        formData.append("Description", data.Description);
        formData.append("AppointmentFee", data.AppointmentFee);
        formData.append("Speciality", data.Speciality);
        formData.append("Degree", data.Degree);
        formData.append("Experience", data.Experience);
        formData.append("Available", data.Available === "true");
        formData.append("Address", data.Address);
        if (image) {
            formData.append("Image", image);
        }

        try {
            const response = await axios.post("http://localhost:4000/api/adddoctors", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setData({
                    DoctorId: "",
                    Doctorname: "",
                    Description: "",
                    AppointmentFee: "",
                    Degree: "",
                    Experience: "",
                    Address: "",
                    Available: "",
                    Speciality: "Neurologist",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while adding the doctor.");
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="Upload Area"
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Doctor Id</p>
                    <input
                        type="number"
                        name="DoctorId"
                        value={data.DoctorId}
                        placeholder="Type here.."
                        onChange={onchangehandler}
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Doctor Name</p>
                    <input
                        type="text"
                        name="Doctorname"
                        value={data.Doctorname}
                        placeholder="Type here.."
                        onChange={onchangehandler}
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Description</p>
                    <input
                    type="text"
                        onChange={onchangehandler}
                        value={data.Description}
                        name="Description"
                        rows="6"
                        placeholder="Write content here.."
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Degree</p>
                    <input
                        type="text"
                        name="Degree"
                        value={data.Degree}
                        placeholder="Type here.."
                        onChange={onchangehandler}
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Experience</p>
                    <input
                        type="text"
                        name="Experience"
                        value={data.Experience}
                        placeholder="Type here.."
                        onChange={onchangehandler}
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Available</p>
                    <input
                        type="text"
                        name="Available"
                        value={data.Available}
                        placeholder="Type here.."
                        onChange={onchangehandler}
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Address</p>
                    <input
                        type="text"
                        name="Address"
                        value={data.Address}
                        placeholder="Type here.."
                        onChange={onchangehandler}
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Doctor Speciality</p>
                        <select
                            onChange={onchangehandler}
                            name="Speciality"
                            value={data.Speciality}
                            required
                        >
                            <option value="Neurologist">Neurologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="General physician">General physician</option>
                            <option value="Pediatricians">Pediatricians</option>
                        </select>
                    </div>
                    <div className="add-price ">
                        <p>Appointment Fee</p>
                        <input
                            onChange={onchangehandler}
                            value={data.AppointmentFee}
                            type="number"
                            name="AppointmentFee"
                            placeholder="Rs.150"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    Add Doctor
                </button>
            </form>
        </div>
    );
};

export default AddDoctors;
