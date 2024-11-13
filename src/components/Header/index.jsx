import { useDispatch, useSelector } from 'react-redux'
import bgImg from '../../assets/bg.jpg'
import { useEffect } from 'react';
import { currentUser } from '../../store/userSlice';

export default function Header() {

    // const dispatch = useDispatch();

    // const user = useSelector( (state) => state.user.user);
    // const status = useSelector( (state) => state.user.status);
    // const error = useSelector( (state) => state.user.error);

    // useEffect( () => {
    //     dispatch(currentUser());
    // }, [dispatch]);
 
    return(
        <div className="w-full h-[50px] bg-primary-dark fixed top-0 left-0 z-[100] flex items-center justify-between items-center"> 
                <div className='pl-5'>Logo</div>
                <div className='pr-5 rounded rounded-full'>
                    <a href="/profile"><img src={bgImg} alt="bg img" className="cursor-pointer rounded-[50px]" width={'40px'} height={'45px'} /></a>
                </div>
        </div>
    )
}