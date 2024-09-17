import { FaCoins, FaHome, FaMapMarkedAlt, FaPhone, FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Import NavLink for active link handling
import Home from "../../pages/Home";
import AddPost from "../../pages/AddPost";
import Accomadation from "../../pages/Accomadation";
import Contact from "../../pages/Contact";
import Budget from "../../pages/Budget";

export default function LeftNav() {


  return (
    <div className="w-full flex justify-center bg-primary text-[20px] h-screen text-white">
      <nav>
        <ul> 
          <ActiveLink href="/">Home <FaHome size={24} /></ActiveLink> 
          <ActiveLink href="/add-post">Add Post <FaPlusCircle size={24} /> </ActiveLink> 
          <ActiveLink href="/accomadation">Accommadation <FaMapMarkedAlt size={24} /> </ActiveLink> 
          <ActiveLink href="/budget">Budget <FaCoins size={24} />  </ActiveLink> 
          <ActiveLink href="/contact">Contact <FaPhone size={24} />  </ActiveLink> 
              
          </ul>
      </nav>    
    </div>
    
  );
}

function ActiveLink({href, children, ...props}) {
  const path = window.location.pathname;

  return (
    <li
      className={`w-full border-b p-3 transition-all duration-300 ease-in-out ${
        path === href ? "text-primary-dark" : "hover:text-gray-300"
      }`}
    >
      <a href={href} {...props} className="flex items-center gap-2">
        {children}
      </a>
    </li>
  )
}
