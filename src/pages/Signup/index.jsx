import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';  // Import the icons
import loginBg from '../../assets/bg.jpg';
import { FaUnlockAlt } from "react-icons/fa";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="w-full bg-cover bg-center h-auto bg-fixed" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white h-auto w-[50%] p-5 rounded my-12">
                    <div className="flex justify-center">
                        <h2 className="text-[30px] font-[700]">Register</h2>
                    </div>

                    <div className="flex gap-2 px-7 mt-5">
                        <div className="w-full py-3">
                            <input type="text" placeholder="First Name" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                        </div>

                        <div className="w-full py-3">
                            <input type="text" placeholder="Last Name" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                        </div>
                    </div>

                    <div className="w-full my-4 px-7 py-3">
                        <input type="email" placeholder="Email" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                    </div>

                    <div className="w-full my-4 px-7 py-3 relative">
                        <input
                            type={showPassword ? "text" : "password"}  // Toggle input type
                            placeholder="Password"
                            className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300"
                        />
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={togglePasswordVisibility}>
                            {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}  {/* Toggle icons */}
                        </div>
                    </div>

                    <div className="w-full px-7 my-4 py-3 relative">
                        <input
                            type="submit"
                            className="w-full text-white text-[25px] font-[500] rounded-lg border py-2 bg-primary-dark cursor-pointer focus:opacity-75 hover:opacity-75 hover:shadow-lg transition-all duration-300 ease-in"
                            value="Register"
                        />
                        <div className="absolute right-[30%] top-1/2 transform -translate-y-1/2">
                            <FiUserPlus size={27} />
                        </div>
                    </div>

                    <div className="w-full px-7 my-4 py-3 relative">
                        <a href="/login"><input
                            type="submit"
                            className="w-full text-white text-[25px] font-[500] rounded-lg border py-2 bg-primary cursor-pointer focus:opacity-75 hover:opacity-75 hover:shadow-lg transition-all duration-300 ease-in"
                            value="Login" 
                        /></a>
                        <div className="absolute right-[30%] top-1/2 transform -translate-y-1/2">
                            <FaUnlockAlt size={27} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
