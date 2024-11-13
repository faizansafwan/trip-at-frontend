import React, { useEffect, useState } from "react";
import loginBg from '../../assets/bg.jpg';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/userSlice";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For navigation after login
    const error = useSelector((state) => state.user.error);
    const status = useSelector((state) => state.user.status);
    
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(formData)); // Always dispatch login regardless of status
    };

    // Effect to handle login status and clear messages
    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/'); // Redirect to dashboard on successful login
        } else if (status === 'failed' && error) {
            setErrorMessage(error.message || 'Login failed. Please try again.'); // Ensure we display the message
        }
    }, [status, error, navigate]);

    // Effect to clear messages after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="w-full bg-cover bg-center h-screen bg-fixed" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white h-auto w-[50%] p-5 rounded">
                    <div className="flex justify-center">
                        <h2 className="text-[30px] font-[700]">Log In</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="w-full my-4 px-7 py-3">
                            <input 
                                type="text" 
                                placeholder="Username or Email" 
                                name="email" 
                                onChange={handleChange} 
                                value={formData.email} 
                                className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300" 
                            />
                        </div>

                        <div className="w-full my-4 px-7 py-3">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                onChange={handleChange} 
                                value={formData.password} 
                                className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300" 
                            />
                        </div>

                        {(errorMessage || error) && (
                            <div className="text-red-500 text-center py-2">
                                {errorMessage} {/* Render error message correctly */}
                            </div>
                        )}

                        <div className="w-full px-7 my-4 py-3">
                            <button 
                                type="submit" 
                                className="w-full text-white text-[25px] font-[500] rounded border py-2 bg-primary cursor-pointer focus:opacity-75 hover:opacity-75 hover:shadow-lg transition-all duration-300 ease-in"
                            >
                                {status === 'loading' ? 'Logging...' : 'Log in'}
                            </button>    
                        </div>
                    </form>

                    <div className="flex justify-between my-4 px-7">
                        <div>
                            <a href="#" className="text-primary text-[18px] hover:opacity-75 hover:underline transition-all duration-300 ease-in">Forgot Password?</a>
                        </div>
                        <div>
                            <a href="/signup" className="text-primary text-[18px] hover:opacity-75 hover:underline transition-all duration-300 ease-in">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
