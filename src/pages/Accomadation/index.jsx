import { useDispatch, useSelector } from 'react-redux';
import bgImg from '../../assets/bg.jpg';
import Rating from 'react-stars';
import { useEffect } from 'react';
import { fetchAccomadation } from '../../store/AccomadationSlice';

export default function Accomadation() {

    const accomadation = useSelector((state) => state.accomadation.accomadation);
    const error = useSelector((state) => state.accomadation.error);
    const status = useSelector((state) => state.accomadation.status);

    const dispatch = useDispatch();

    useEffect( () => {
        if(accomadation.length === 0) {
          dispatch(fetchAccomadation());  
        }
        
    }, [dispatch, accomadation]);

    return(
        <div className="mt-[80px] mx-10 ">
            <div className="flex gap-2 items-center justify-center">
                <div>
                    <input type="text" placeholder="Search" className="border border-primary-dark p-2 pl-2 
                    rounded rounded-lg outline-primary-dark" />
                </div>  
                <div>
                    <select name="" id="" className="p-2 bg-primary-light outline-primary-dark rounded">
                        <option value="Star">Star</option>
                        <option value="Star 1">Star 1</option>
                        <option value="Star 2">Star 2</option>
                        <option value="Star 3">Star 3</option>
                        <option value="Star 4">Star 4</option>
                        <option value="Star 5">Star 5</option>
                    </select>
                </div>  
                <div>
                    <select name="" id="" className="p-2 bg-primary-light outline-primary-dark rounded">
                        <option value="Star">Type</option>
                        <option value="Star 1">Hotel</option>
                        <option value="Star 2">Hostel</option>
                        <option value="Star 3">House</option>
                        <option value="Star 4">Villa</option>
                        <option value="Star 5">Resort</option>
                    </select>
                </div>  
                <div className="flex gap-2 items-center">
                    <p><b>Range:</b></p>
                    <input type="text" placeholder="1000" className="border border-primary-dark p-2 rounded 
                    rounded-lg outline-primary-dark" />
                    <p> to </p>
                    <input type="text" placeholder="4000" className="border border-primary-dark p-2 rounded 
                    rounded-lg outline-primary-dark" />

                </div>  
                <div>
                    <input type="submit" value={'Search'} className="p-2 text-white bg-primary-dark rounded 
                    hover:opacity-75 transition ease-in duration-300 rounded-lg cursor-pointer" />
                </div>  
                 
            </div>

            { status === 'failed' && (
                <div className='text-red-400'>{`Error: ${error}`}</div>
            )}

            {status === 'loading' && (
                <div>Loading...</div>
            )}

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                { status === 'succeeded' ? (
                    accomadation.map( (place, index) => (
                    <div key={index} className="p-2 flex gap-2 mt-10 bg-primary-light rounded">
                            <div>
                                <img src={bgImg} alt="" width={'200px'} height={'250px'} className='rounded'   />
                            </div>
                            <div className='p-2'>
                                <div className='mb-2'><p className=' font-semibold text-[15px]'>{place.name}</p></div>
                                <div className=''><p className='text-[13px]'>{place.address}</p></div>
                                <div className='my-3'><p className='text-[12px]'>{place.description}</p></div>
                                <div><p className='text-[13px] font-semibold'>{place.unit}. {place.price.toFixed(2)}</p></div>
                                <div>
                                    <Rating count={5} value={place.rating} size={20} color1="gray" color2="#316EFF" half={false}
                                    edit={false} className="focus:outline-primary" />
                                </div>
                                <div><button className='p-2 rounded rounded-full bg-primary-dark text-white text-[13px]'>More Details</button></div>
                            </div>
                        </div> 
                    ))
                    
                ): ( <div>No Accommadation Found</div> )}
            </div>

            

                    
        </div>
    )
}