import { useDispatch, useSelector } from 'react-redux'
import bgImg from '../../assets/bg.jpg'
import userImg from '../../assets/user-profile.jpeg';
import { useEffect } from 'react';
import { currentUser, signOut } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector( (state) => state.user.user);
    const status = useSelector( (state) => state.user.status);
    const error = useSelector( (state) => state.user.error);

    const [optionVisible, setOptionVisible] = useState(false);

    const toggleDropdown = () => {
        setOptionVisible((prev) => !prev);
    };

    useEffect( () => {
        dispatch(currentUser());
    }, [dispatch]);
 

    const handleSignOut = () => {
        localStorage.removeItem('token');
        dispatch(signOut());
        setOptionVisible(false);
        navigate('/login');
    };

    return(
        <div className="w-full h-[50px] bg-primary-dark fixed top-0 left-0 z-[100] flex items-center justify-between items-center"> 
            <div className='pl-5'>Logo</div>

            <div className="relative flex flex-col items-center">
                <div className="rounded-full cursor-pointer mr-5" onClick={toggleDropdown}>
                    <img src={ user ? user.profilePicture : userImg} alt="Profile" className="rounded-full" width="30px" height="30px" />
                </div>

                {optionVisible && (
                    <div className="absolute top-full right-1 mt-2 bg-white shadow-lg rounded-md py-2 w-40 text-sm">
                        { status === 'succeeded' || user ? (
                            <>
                                <button onClick={() => { setOptionVisible(false); navigate('/profile'); }} 
                                    className="block w-full py-2 hover:bg-gray-200" >
                                    Profile
                                </button>
                                <button onClick={handleSignOut} className="block w-full py-2 hover:bg-gray-200" >
                                    Sign Out
                                </button>
                            </>
                            ) : (
                            <>
                                <button onClick={() => { setOptionVisible(false); navigate('/login'); }} 
                                    className="block w-full py-2 hover:bg-gray-200" >
                                    Login
                                </button>
                                <button onClick={() => { setOptionVisible(false); navigate('/signup'); }} 
                                    className="block w-full py-2 hover:bg-gray-200" >
                                    Create Account
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>        
        </div>
    )
}