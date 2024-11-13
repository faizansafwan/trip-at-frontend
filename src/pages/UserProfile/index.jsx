import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { currentUser } from "../../store/userSlice";
import Header from "../../components/Header";
import LeftNav from "../../components/LeftNavigation";


export default function UserProfile() {

    const dispatch = useDispatch();

    const user = useSelector( (state) => state.user.user);
    const error = useSelector( (state) => state.user.error);
    const status = useSelector( (state) => state.user.status);

    useEffect( () => {
        dispatch(currentUser());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading profile...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="">
            <Header />
            {
                user ? (
                    <div className="mt-[80px] flex flex-col items-center border p-3">
                         <div className="text-left">
                            <b>First Name</b> {user.firstName}
                        </div>
                         <div className="text-left">
                            <b>Last Name</b> {user.lastName}
                        </div>
                         <div className="text-left">
                            <b>Email</b> {user.email}
                        </div>
                         
                    </div>
                    
                ) : (
                    <div>No Data Found</div>
                )
            }
            
        </div>
    )
}