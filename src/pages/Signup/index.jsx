import React from "react"
import loginBg from '../../assets/bg.jpg'

export default function SignupPage() {

    return(
        <div className="w-full bg-cover bg-center h-screen bg-fixed" style={{ backgroundImage: `url(${loginBg})` }} >
            <div className="flex items-center justify-center h-full">
                <div className=" bg-white h-auto w-[50%] p-5 rounded">

                    <div className="flex justify-center">
                        <h2 className="text-[30px] font-[700] ">Register</h2>
                    </div>

                    <div className="flex gap-2 px-7 mt-5">
                        <div className="w-full  py-3">
                            <input type="text" placeholder="First Name" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px]  focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                        </div>

                        <div className="w-full py-3">
                            <input type="text" placeholder="Last Name" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px]  focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                        </div>
                    </div>

                    <div className="w-full my-4  px-7 py-3">
                        <input type="text" placeholder="Username or Email" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px]  focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                    </div>

                    <div className="w-full my-4 px-7 py-3">
                        <input type="password" placeholder="Password" className="w-[100%] px-2 py-2 rounded border-b border-primary text-[18px] focus:border-b-2 focus:border-primary outline-none transition duration-300" />
                    </div>

                    <div className="w-full px-7 my-4 py-3">
                        <input type="submit" className="w-full text-white text-[25px] font-[500] rounded rounded-md border py-2 bg-primary cursor-pointer focus:opacity-75 hover:opacity-75 hover:shadow-lg transition-all duration-300 ease-in" value={"Log In"} />
                    </div>

                    <div className="flex justify-between my-4  px-7">
                        <div>
                            <a href="" className="text-primary text-[18px] hover:opacity-75 hover:underline transition-all duration-300 ease-in">Forgot Password</a>
                        </div>

                        <div>
                            <a href="/signup" className="text-primary text-[18px] hover:opacity-75 hover:underline transition-all duration-300 ease-in">Register</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}