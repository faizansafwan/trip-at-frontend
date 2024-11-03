// src/components/SignupPage.js
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';
import { FaUnlockAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from '../../store/userSlice';
import loginBg from '../../assets/bg.jpg';

export default function SignupPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        profilePicture: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData); // Debug
        console.log("Form is being submitted");
        dispatch(createUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            
        })).then((response) => {
            console.log("Response from createUser:", response);
        }).catch((error) => {
            console.error("Error in createUser:", error);
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="w-full bg-cover bg-center h-auto bg-fixed" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white h-auto w-[50%] p-5 rounded my-12">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                            <h2 className="text-[30px] font-[700]">Register</h2>
                        </div>

                        <div className="flex gap-2 px-7 mt-5">
                            <div className="w-full py-3">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300"
                                />
                            </div>

                            <div className="w-full py-3">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300"
                                />
                            </div>
                        </div>

                        <div className="w-full my-4 px-7 py-3">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300"
                            />
                        </div>

                        <div className="w-full my-4 px-7 py-3 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300"
                            />
                            <div
                                className="absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                            </div>
                        </div>

                        <div className="w-full px-7 my-4 py-3 relative">
                            <button
                                type="submit" 
                                className="w-full text-white text-[25px] font-[500] rounded-lg border py-2 bg-primary-dark cursor-pointer focus:opacity-75 hover:opacity-75 hover:shadow-lg transition-all duration-300 ease-in"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Registering...' : 'Register'}
                            </button>
                            <div className="absolute right-[30%] top-1/2 transform -translate-y-1/2">
                                <FiUserPlus size={27} />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-center py-2">
                                {error.message || 'An error occurred'}
                            </div>
                        )}

                        {user && (
                            <div className="text-green-500 text-center py-2">
                                User created successfully!
                            </div>
                        )}

                        <div className="w-full px-7 my-4 py-3 relative">
                            <a href="/login" className="block">
                                <button
                                    type="button" 
                                    className="w-full text-white text-[25px] font-[500] rounded-lg border py-2 bg-primary cursor-pointer focus:opacity-75 hover:opacity-75 hover:shadow-lg transition-all duration-300 ease-in"
                                >
                                    Login
                                </button>
                            </a>
                            <div className="absolute right-[30%] top-1/2 transform -translate-y-1/2">
                                <FaUnlockAlt size={27} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
