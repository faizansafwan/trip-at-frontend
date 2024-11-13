import { FaCalendarAlt } from "react-icons/fa"
import bgImg from "../../assets/bg.jpg"
import { FaBarsProgress } from "react-icons/fa6"
import Rating from "react-stars";

export default function NewPostModal({firstName, lastName, userProfile, location, dateVisited, ratePlace,
    positiveDesc, negativeDesc, images, additionalInfo}) {

    return(
        <div className="p-2 px-4 bg-primary-light">
            <div className="flex gap-2">
                <div className="mt-1">
                    <img src={userProfile} alt="Profile" className="w-[40px] h-[40px] rounded-[30px]" />
                </div>

                <div className="flex flex-col">
                    
                    <div>
                        <p><b>{firstName} {lastName}</b> is at <b className="text-primary-dark"> {location}</b></p>
                    </div>
                    <div>
                        <p className="text-[12px]">{dateVisited}</p>
                    </div>
                </div>
                 
            </div>

            <div className="flex justify-center m-4">
                <img src={bgImg} alt="" className="w-full h-auto rounded" />
            </div>

            <div className="flex m-5 gap-3 text-primary my-8">
                <FaCalendarAlt size={24} />
                <p><b>02/03/2024</b></p>
            </div>

            <div className="flex m-5 gap-3 text-primary my-8 items-center">
                <FaBarsProgress size={24} style={{ transform: 'rotate(-90deg)' }} className="text-primary"/>
                <Rating count={5} value={ratePlace} size={24} color1="gray" color2={'#316EFF'} half={false} className="focus:outline-primary" />
            </div>

            <div className="m-5">

                <div className="mb-5">
                    <h3 className=" text-[18px]"><b>Positive Description</b></h3>
                </div>

                <div>
                    <p>
                    {positiveDesc}
                    </p>
                </div>

                <div className="my-5">
                    <h3 className=" text-[18px]"><b>Negative Description</b></h3>
                </div>

                <div>
                    <p>
                    {negativeDesc}
                    </p>
                </div>

                <div className="my-5">
                    <h3 className=" text-[18px]"><b>Additional Description</b></h3>
                </div>

                <div>
                    <p>
                    {additionalInfo}
                    </p>
                </div>

            </div>

        </div>
    )
}