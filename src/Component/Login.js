import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [flag, setFlag] = useState(false); // Fix: Initialize flag state
    const navigate = useNavigate(); // Fix: Use useNavigate for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Form Data Submitted:', formData);

        try {
            const response = await fetch("http://localhost:8084/food-ordering/Validate-admin", { // Fix: Removed extra "/"
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Response Data:', data);

            if (data.email && data.password) { // Check if credentials are valid
                localStorage.setItem('user', JSON.stringify(data));
                alert('Login successful!');
                navigate('/home-page'); // Fix: Correct navigation
            } else {
                alert('Login failed....!');
                setFlag(true);
                navigate('/Login-user'); // Fix: Correct navigation
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" 
    style={{ 
        backgroundImage: "url('https://b.zmtcdn.com/data/pictures/9/37809/d30d96e14fe31f1a3c5f01952950fd03_featured_v2.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*')", 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        height: "70vh"
    }}>

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>

                    {flag && ( // Fix: Conditional rendering for error message
                        <div className="col-12 p-3">
                            <div className="alert alert-danger">Login failed! Please check your credentials.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;


