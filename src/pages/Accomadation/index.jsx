import { useDispatch, useSelector } from 'react-redux';
import bgImg from '../../assets/bg.jpg';
import Rating from 'react-stars';
import { useEffect, useState } from 'react';
import { fetchAccomadation, fetchAccomadationById } from '../../store/AccomadationSlice';
import { FaPlus } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { FaX } from 'react-icons/fa6';

function limitText(text, limit) {
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
}

export default function Accomadation() {

    const accomadation = useSelector((state) => state.accomadation.accomadation);
    const SelectedAcc = useSelector((state) => state.accomadation.selectedAccommodation);
    const error = useSelector((state) => state.accomadation.error);
    const status = useSelector((state) => state.accomadation.status);

    const dispatch = useDispatch();


    const [search, setSearch] = useState('');
    const [star, setStar] = useState('');
    const [type, setType] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [filteredAccomadation, setFilteredAccomadation] = useState([]);
    const [showFiltered, setShowFiltered] = useState(false); // New state to toggle view

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [id, setId] = useState('');


    useEffect( () => {
        if (id) {
            dispatch(fetchAccomadationById(id));
        }
    }, [dispatch, id]);

    useEffect( () => {
        if(accomadation.length === 0) {
          dispatch(fetchAccomadation());  
        }   
    }, [dispatch, accomadation]);

    const closeModal = () => setModalIsOpen(false);

    const handleId = (id) => {
        setId(id);
        setModalIsOpen(true);
        console.log(id);    
    };

    const handleSearch = ( () => {
        const isFiltering =
        search.trim() !== '' ||
        star.trim() !== '' ||
        type.trim() !== '' ||
        priceRange.min.trim() !== '' ||
        priceRange.max.trim() !== '';

        if(isFiltering) {
            const filtered = accomadation.filter((place) => {
            // Match search
            const matchesSearch = place.name.toLowerCase().includes(search.toLowerCase()) || 
                            place.description.toLowerCase().includes(search.toLowerCase()) || 
                            place.address.toLowerCase().includes(search.toLowerCase());
    
            // Match star rating (if selected)
            const matchesStar = star ? place.rating === parseInt(star) : true;
    
            // Match type (if selected)
            const matchesType = type ? place.type === type : true;
    
            // Match price range (if selected)
            const matchesPriceRange =
                (!priceRange.min || place.price >= parseFloat(priceRange.min)) &&
                (!priceRange.max || place.price <= parseFloat(priceRange.max));
    
            return matchesSearch && matchesStar && matchesType && matchesPriceRange;

            });

            setFilteredAccomadation(filtered);
            setShowFiltered(true); // Toggle to filtered view
        } 
        else {
            setShowFiltered(false); // Show all accommodations
        }
        
    });

    return(
        <div className="mt-[80px] mx-10 ">

            <div className="flex gap-2 items-center justify-center">
                <div>
                    <input type="text" placeholder="Search" className="border border-primary-dark p-2 pl-2 
                    rounded rounded-lg outline-primary-dark" onChange={(e) => setSearch(e.target.value)} />
                </div>  
                <div>
                    <select value={star} className="p-2 bg-primary-light outline-primary-dark rounded" 
                    onChange={(e) => setStar(e.target.value)}>
                        <option value="">Star</option>
                        <option value="1">Star 1</option>
                        <option value="2">Star 2</option>
                        <option value="3">Star 3</option>
                        <option value="4">Star 4</option>
                        <option value="5">Star 5</option>
                    </select>
                </div>  
                <div>
                    <select value={type} onChange={(e) => setType(e.target.value)} 
                    className="p-2 bg-primary-light outline-primary-dark rounded">
                        <option value="">Type</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Hostel">Hostel</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Resort">Resort</option>
                    </select>
                </div>  
                <div className="flex gap-2 items-center">
                    <p><b>Range:</b></p>
                    <input type="text" value={priceRange.min} 
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} placeholder="1000"
                    className="border border-primary-dark p-2 rounded rounded-lg outline-primary-dark" />
                    <p> to </p>
                    <input type="text" value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} placeholder="4000" 
                        className="border border-primary-dark p-2 rounded rounded-lg outline-primary-dark" />
                </div>  
                <div>
                    <input type="submit" onClick={handleSearch} value={'Search'} className="p-2 text-white bg-primary-dark rounded 
                    hover:opacity-75 transition ease-in duration-300 rounded-lg cursor-pointer" />
                </div>  
                 
            </div>

            { status === 'failed' && (
                <div className='text-red-400'>{`Error: ${error}`}</div>
            )}

            {status === 'loading' && (
                <div>Loading...</div>
            )}

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 my-10">
                { status === 'succeeded' ? (
                    (showFiltered ? filteredAccomadation : accomadation).map( (place, index) => (
                    <div key={index} className="p-2 flex gap-2  bg-primary-light rounded">
                            <div>
                                <img src={place.images} alt="" width={'200px'} height={'250px'} className='rounded'   />
                            </div>
                            <div className='p-2'>
                                <div className='mb-2'><p className=' font-semibold text-[15px]'>{place.name}</p></div>
                                <div className=''><p className='text-[13px]'>{place.address}</p></div>
                                <div className='my-3'><p className='text-[12px]'>{limitText(place.description, 30)}</p></div>
                                <div>
                                    <p className='text-[13px] font-semibold'>{place.unit} {place.price.toFixed(2)} per {place.type}
                                    </p>
                                </div>
                                {
                                    place.rating ? (<div>
                                    <Rating count={5} value={place.rating} size={20} color1="gray" color2="#316EFF" half={false}
                                    edit={false} className="focus:outline-primary" />
                                </div>) : (<div> </div>)
                                }
                                
                                <div><button onClick={ () => handleId(place._id)} className='p-2 mt-3 rounded rounded-full bg-primary-dark text-white text-[13px]'>More Details</button></div>
                            </div>
                        </div> 
                    ))
                    
                ): ( <div>No Accommadation Found</div> )}
            </div>

            <div className="fixed bottom-12 right-12">
                <a href="/budget/accommadation-form">
                    <FaPlus
                        size={40}
                        className="cursor-pointer text-white bg-primary-dark p-1 rounded-full shadow-lg hover:opacity-75 transition ease-out duration-300"
                    />
                </a>
            </div>

            <ReactModal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        zIndex: 100,
                    },
                    content: {
                        color: "lightsteelblue",
                        borderRadius: "10px",
                        padding: "10px",
                        height: 'auto',
                        maxHeight: 'auto',
                        maxWidth: "60%",
                        margin: "auto",
                        zIndex: 120,
                    },
            }}>
                <div>
                    <div className="flex justify-end cursor-pointer">
                        <button onClick={closeModal}><FaX size={20} /></button>
                    </div>

                    <div className='flex gap-3 m-4'>

                        <div className='w-1/2'>
                            {/* <img src={SelectedAcc.images} alt='imgage' className='w-full h-auto'  /> */}
                        </div>

                        <div className='w-1/2'>
                        {
                            SelectedAcc && (
                                <div>

                                    <div>
                                        <p className='text-[25px] font-semibold'>{SelectedAcc.name}</p>
                                    </div>

                                    <table className='text-left'>
                                        <tr>
                                            <th className='p-2'>Description</th>
                                            <td className='p-2'> {SelectedAcc.description}</td>
                                        </tr>

                                        <tr>
                                            <th className='p-2'>Address</th>
                                            <td className='p-2'> {SelectedAcc.address}</td>
                                        </tr>
                                        <tr>
                                            <th className='p-2'>Phone</th>
                                            <td className='p-2'> {SelectedAcc.phone}</td>
                                        </tr>
                                        <tr>
                                            <th className='p-2'>Email</th>
                                            <td className='p-2'> {SelectedAcc.email}</td>
                                        </tr>
                                        <tr>
                                            <th className='p-2'>Price</th>
                                            <td className='p-2'> {SelectedAcc.unit} {SelectedAcc.price.toFixed(2)} per &nbsp;
                                            {SelectedAcc.type} </td>
                                        </tr>
                                    </table>
                                    {/* <div>
                                        <div><p className='text-[25px] font-semibold p-2'>{SelectedAcc.name}</p></div>
                                        <div><p className='px-3'>Description: </p></div>
                                        <div><p>Contact: </p></div>
                        
                                        <div><p>Email: </p></div>
                                        <div>
                                            <p>{SelectedAcc.unit} {SelectedAcc.price.toFixed(2)} per &nbsp;
                                            {SelectedAcc.type} </p></div>
                                    </div>

                                    <div>
                                        <div><p className='text-[25px] font-semibold p-2'>{SelectedAcc.name}</p></div>
                                        <div><p className='px-3'>{SelectedAcc.description}</p></div>
                                        <div className='flex p-2'>
                                            <div><p>{SelectedAcc.address}</p></div>
                                            <div><p>{SelectedAcc.phone}</p></div>  
                                        </div>
                                            
                                        <div><p>{SelectedAcc.email}</p></div>
                                        <div>
                                            <p>{SelectedAcc.unit} {SelectedAcc.price.toFixed(2)} per &nbsp;
                                            {SelectedAcc.type} </p></div>
                                    </div> */}
                                    
                                    
                                </div>
                                
                            ) 
                        }
                            
                        </div>
                    </div> 
                </div>
                    

            </ReactModal>


         
        </div>
    )
}

