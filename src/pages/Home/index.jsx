import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTravel } from "../../store/travelSlice";
import { FaCalendarAlt } from "react-icons/fa"
import bgImg from "../../assets/bg.jpg"
import { FaBarsProgress } from "react-icons/fa6"
import Rating from "react-stars";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTravel());
    }, [dispatch]);

    const travelData = useSelector((state) => state.travel.travel?.data || []);
    const status = useSelector((state) => state.travel.status);
    const error = useSelector((state) => state.travel.error);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-center mt-4">Travel Posts</h1>
            <div className="mt-[80px] m-7 grid grid-cols-1 md:grid-cols-2 gap-3">
                {status === 'loading' && <p>Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                
                {status === 'succeeded' && travelData.length > 0 ? (
                    travelData.map((post) => (
                        <div key={post._id} className="p-2 px-4 bg-primary-light rounded shadow-lg">
                            <div className="flex gap-2">
                                <div className="mt-1">
                                    <img src={post.userProfile} alt="Profile" className="w-[40px] h-[40px] rounded-[30px]" />
                                </div>

                                <div className="flex flex-col">
                                    <div>
                                        <p><b>{post.firstName} {post.lastName}</b> is at <b className="text-primary-dark">{post.location}</b></p>
                                    </div>
                                    <div>
                                        <p className="text-[12px]">{new Date(post.dateVisited).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center m-4">
                                {post.images && post.images[0] && (
                                    <img src={post.images[0]} alt="" className="w-full h-auto rounded" />
                                )}
                            </div>

                            <div className="flex m-5 gap-3  my-8">
                                <FaCalendarAlt size={24} />
                                <p><b>{new Date(post.dateVisited).toLocaleDateString()}</b></p>
                            </div>

                            <div className="flex m-5 gap-3  my-8 items-center">
                                <FaBarsProgress size={24} style={{ transform: 'rotate(-90deg)' }} className="" />
                                <Rating
                                    count={5}
                                    value={post.ratePlace || 0}
                                    size={24}
                                    color1="gray"
                                    color2="#316EFF"
                                    half={false}
                                    edit={false}
                                    className="focus:outline-primary"
                                />
                            </div>

                            <div className="m-5">
                                <div className="mb-5">
                                    <h3 className="text-[18px]"><b>Positive Description</b></h3>
                                </div>
                                <div>
                                    <p>{post.positiveDesc || 'No positive feedback provided.'}</p>
                                </div>

                                <div className="my-5">
                                    <h3 className="text-[18px]"><b>Negative Description</b></h3>
                                </div>
                                <div>
                                    <p>{post.negativeDesc || 'No negative feedback provided.'}</p>
                                </div>

                                <div className="my-5">
                                    <h3 className="text-[18px]"><b>Additional Description</b></h3>
                                </div>
                                <div>
                                    <p>{post.additionalInfo || 'No additional information provided.'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    status === 'succeeded' && <p>No travel posts found.</p>
                )}
            </div>
        </div>
    );
}
