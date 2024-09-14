import { FaHome, FaPlusCircle } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

export default function LeftNav() {

    return (
        <div className="w-full flex justify-center bg-primary text-[20px] h-screen">
            <ul>
                <a href="" className="flex items-center gap-3">
                    <li className="p-2">Home </li> <FaHome size={25} /> 
                </a>
                <a href="" className="flex items-center gap-3">
                    <li className="p-2">Add Post</li> 
                    <FaPlusCircle size={25} />
                </a>
                <a href="" className="flex items-center gap-3">
                    <li className="p-2">Accomadation</li>
                    <FaLocationPin size={25} />
                </a>
                <a href="" className="flex items-center gap-3"><li className="p-2">Budget</li></a>
                <a href="" className="flex items-center gap-3"><li className="p-2">Contact</li></a>
            </ul>
        </div>
    )
}