import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane, FaPhone } from "react-icons/fa";
import LeftNav from "../../components/LeftNavigation";
import { FaMapLocation } from "react-icons/fa6";

export default function Contact() {

    return(
        <div className="mt-[80px]">  
            <div className="m-5 sm:m-10">
                <h2 className="text-[23px] font-[700]">Reach Us</h2>
            </div>

            <div className="m-5 sm:m-10">

                <form>
                    <div className="w-full flex items-center mb-3"> 
                        <label htmlFor="" className="w-[23%] sm:w-[20%] text-[18px] font-[500]">Name</label>
                        <input type="text" placeholder="Name" className="w-full p-2 border border-primary rounded rounded-2 focus:outline-primary-dark" />
                    </div>

                    <div className="w-full flex items-center mb-3">
                        <label htmlFor="" className="w-[23%] sm:w-[20%] text-[18px] font-[500]">Email</label>
                        <input type="email" placeholder="email" className="w-full p-2 border border-primary rounded rounded-2 focus:outline-primary-dark" />
                    </div>

                    <div className="w-full flex mb-3">
                        <label htmlFor="" className="w-[23%] sm:w-[20%] pt-2 text-[18px] font-[500]">Message</label>
                        <textarea style={{ width: '100%', height: '150px'}} placeholder="Write Your message here..." className="p-2 border border-primary rounded rounded-2
                        focus:outline-primary-dark" />
                    </div>

                    <div className="flex justify-end my-5 relative">
                        <FaPaperPlane size={15} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
                        <input type="submit" placeholder="Write your message here..." className="p-2 pr-9 text-white text-[18px] rounded rounded-2 bg-primary-dark 
                        cursor-pointer hover:opacity-75 transition-opacity duration-500 ease-in-out focus:opacity-75" value={"Send"} />
                    </div>

                </form>

            </div>

            <div className="flex gap-20 m-10  border-t mr-10 justify-center">
                <div>
                    <div className="flex gap-3 m-3 p-2 items-center">
                        <FaMapLocation size={24} className="text-primary-dark hover:text-black transition ease-in duration-300" />
                        <p className="text-[12px] sm:text-[18px] font-medium">Location Address</p>
                    </div>

                    <div className="flex gap-3 m-3 p-2 items-center">
                        <FaEnvelope size={24} className="text-primary-dark hover:text-black transition ease-in duration-300" />
                        <p className="text-[12px] sm:text-[18px] font-medium">abc123@gmail.com</p>
                    </div>
                </div>

                <div>
                    <div className="flex gap-3 m-3 p-2 items-center">
                        <FaPhone size={24} className="text-primary-dark hover:text-black transition ease-in duration-300" />
                        <p className="text-[12px] sm:text-[18px] font-medium">+94 754 456 345</p>
                    </div>

                    <div className="flex m-3 p-2 ">
                        <div className="pr-3"><a href="#"><FaFacebook size={24} style={{ fontSize: '20px' }} className="text-primary-dark hover:text-black transition ease-in duration-300" /></a></div>
                        <div className="px-3 "><a href="#"><FaInstagram size={24} style={{ fontSize: '20px' }} className="text-primary-dark hover:text-black transition ease-in duration-300" /></a></div>
                        <div className="px-3"><a href="#"><FaLinkedin size={24} style={{ fontSize: '20px' }} className="text-primary-dark hover:text-black transition ease-in duration-300" /></a></div>
                    </div>
                </div>
                

            </div>
                
        </div>
    )
}