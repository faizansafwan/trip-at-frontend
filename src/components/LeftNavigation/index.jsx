import { FaCoins, FaHome, FaMapMarkedAlt, FaPhone, FaPlusCircle } from "react-icons/fa";

export default function LeftNav() {


  return (
    <div className="w-[50%] lg:w-[19%] md:w-[25%] sm:w-[35%] z-[80] fixed top-50 left-0 flex justify-center bg-primary text-[20px] h-screen text-white">
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
