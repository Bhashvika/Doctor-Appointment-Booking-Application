import React, { useState } from 'react';
import axios from 'axios';
import "./DoctorLogin.css";
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        doctorname: "",
        doctorid: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let url = "http://localhost:4000";
        url += currentState === 'Sign Up' ? "/api/Doctorregister" : "/api/Doctorlogin";

        try {
            const response = await axios.post(url, data);
            if (response.data.success) {
                localStorage.setItem('Doctortoken', response.data.token);
                localStorage.setItem('DoctorName',response.data.doctorname);
                localStorage.setItem('role', response.data.role);
                if (currentState === 'Sign Up') {
                    alert("Registration successful! You can now log in.");
                    setCurrentState("Login");
                    setData({
                        doctorname: "",
                        doctorid: "",
                        email: "",
                        password: ""
                    });
                } else {
                    navigate(`/Appointment/${data.doctorid}`);
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during registration/login:", error.response?.data || error.message);
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="login-popup">
            <h1 style={{ textAlign: 'center', fontSize: '40px', color: 'black', paddingTop: '20px' }}>Doctor Authentication</h1>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? null : (
                        <div>
                            <input
                                name='doctorname'
                                className='input'
                                onChange={onChangeHandler}
                                value={data.username}
                                type='text'
                                placeholder='your name'
                                required
                            />
                        </div>
                    )}
                    <input
                        name='doctorid'
                        onChange={onChangeHandler}
                        value={data.doctorid}
                        type='text'
                        placeholder='Doctor Id'
                        required
                    />
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type='email'
                        placeholder='your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type='password'
                        placeholder='your password'
                        required
                    />
                </div>
                <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                {currentState === 'Login' ? (
                    <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default DoctorLogin;
