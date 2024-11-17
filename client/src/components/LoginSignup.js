//client/src/components/LOginSignup.js

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginSignup.css';

const LoginSignup = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleToggle = () => {
        setIsSignup(!isSignup);
        // Reset form data when switching between login and signup
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            console.log("Signing up with data:", formData);
            // Handle signup logic here
        } else {
            console.log("Logging in with data:", { email: formData.email, password: formData.password });
            // If login is successful, navigate to ExpenseTracker
            navigate('/expensetracker'); // Navigate to ExpenseTracker page
        }
        // Reset form data after submission
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="wrapper">
            <div className="title-text">
                <div className={`title login ${!isSignup ? 'active' : ''}`}>Enter Your Account</div>
                <div className={`title signup ${isSignup ? 'active' : ''}`}>Create an Account</div>
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input type="radio" name="slide" id="login" checked={!isSignup} onChange={handleToggle} />
                    <input type="radio" name="slide" id="signup" checked={isSignup} onChange={handleToggle} />
                    <label htmlFor="login" className="slide login">Login</label>
                    <label htmlFor="signup" className="slide signup">Signup</label>
                    <div className="slider-tab" style={{ left: isSignup ? '50%' : '0' }}></div>
                </div>
                <div className="form-inner">
                    {/* Login Form */}
                    <form className={`login ${isSignup ? 'hidden' : ''}`} onSubmit={handleSubmit}>
                        <div className="field">
                            <input type="text" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
                        </div>
                        
                        <div className="pass-link">
                            <button type="button" onClick={() => alert('Forgot password functionality not implemented yet.')}>Forgot password?</button>
                        </div>
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Login" />
                        </div>
                        <div className="signup-link">Not a member? <button type="button" onClick={handleToggle}>Signup now</button></div>
                    </form>
                    {/* Signup Form */}
                    <form className={`signup ${isSignup ? '' : 'hidden'}`} onSubmit={handleSubmit}>
                        <div className="field">
                            <input type="text" name="username" placeholder="User Name" required value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <input type="text" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Signup" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
