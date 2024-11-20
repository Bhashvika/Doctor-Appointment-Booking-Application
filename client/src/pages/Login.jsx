import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [currentState, setCurrentState] = useState("Sign Up");
    const [data, setData] = useState({
        username: "",
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
        if (currentState === 'Login') {
            url += '/api/login';
        } else {
            url += '/api/register';
        }

        try {
            const response = await axios.post(url, data);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                console.log(localStorage.getItem('token'));
                // If registering, navigate to login page
                if (currentState === 'Sign Up') {
                    alert("Registration successful! You can now log in.");
                    setCurrentState("Login"); // Change state to Login
                    setData({ username: "", email: "", password: "" }); // Reset form data
                } else {
                    navigate('/Doctors'); // Navigate to Doctors page after login
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during registration/login:", error.response?.data || error.message);
            alert(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? null : (
                        <div>
                            <input
                                name='username'
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

export default Login;
