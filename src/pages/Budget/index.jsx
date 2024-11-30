import { FaCalendarDay, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget , fetchBudgetByEmail, fetchBudgetById} from "../../store/budgetSlice";
import { useEffect, useState } from "react";
import { currentUser } from "../../store/userSlice";
import ReactModal from "react-modal";
import { FaLocationDot, FaLocationPin, FaX } from "react-icons/fa6";

export default function Budget() {
    const budgets = useSelector((state) => state.budget.budget);
    const selectedBudget = useSelector( (state) => state.budget.selectedBudget);
    const status = useSelector((state) => state.budget.status);
    const error = useSelector((state) => state.budget.error);

    const [id, setId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const user = useSelector( (state) => state.user.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
          dispatch(fetchBudgetById(id));  
        }
        
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
           dispatch(fetchBudgetByEmail(user.email)); 
        }
        
    }, [dispatch, user]);

    useEffect(() => {
        console.log('Selected Budget updated:', selectedBudget); // Debugging
    }, [selectedBudget]);

    
    const closeModal = () => setModalIsOpen(false);

    const handleId = (budgetId) => {
        setId(budgetId);
        setModalIsOpen(true);
        console.log(selectedBudget);

    };

    console.log(budgets); // Debugging purposes: Check structure of budget data
    
    return (
        <div className="mt-[80px] mx-8">
            <div className="my-5">
                <h2 className="text-[30px] font-[500]">Budget List</h2>
            </div>

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}

            <div className="grid grid-cols-2 gap-2">
                {Array.isArray(budgets) && budgets.length > 0 ? (
                    budgets.map((budget) => (
                        <button onClick={() => handleId(budget._id)} key={budget._id}>
                            <div 
                                className="cursor-pointer bg-primary-light p-3 rounded flex justify-between hover:opacity-75 transition ease-in duration-300"
                            >
                                <div className="py-2 font-[500]">{budget.budgetName}</div>
                                <div className="py-2 font-[500]">
                                    {/* Calculate and display the total */}
                                    Rs. {budget.cost.reduce((total, num) => total + num, 0).toFixed(2)}
                                </div>
                            </div>
                        </button>
                    ))
                ) : (
                    <p>No budgets available.</p>
                )}
            </div>

            {/* React Modal */}
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
                        padding: "20px",
                        height: 'auto%',
                        maxWidth: "60%",
                        margin: "auto",
                        zIndex: 120,
                    },
                }} > 


                
                { selectedBudget &&
                    ( <div className="m-5">

                        <div className="flex justify-end cursor-pointer">
                            <button onClick={closeModal}><FaX size={20} /></button>
                        </div>

                        <div className="mb-5">
                            <h2 className="text-center md:text-[25px] text-[20px]">{selectedBudget.budgetName}</h2>
                        </div>
                        

                        <div className="flex gap-2 md:text-[18px] m-3 text-[12px]">
                            <p className="text-primary"><FaLocationDot className="md:w-6 md:h-6 w-4 h-4"  /></p>
                            <p>{selectedBudget.start}</p>
                            <p>{'-->'}</p>
                            <p>{selectedBudget.destination}</p>
                        </div>

                        <div className="flex gap-3 md:text-[18px] m-3 text-[12px]">
                            <p className="text-primary"><FaCalendarDay className="md:w-6 md:h-6 w-4 h-4" /></p>
                            <p>{new Date(selectedBudget.startDate).toLocaleDateString()}</p>
                            <p>{'-->'}</p>
                            <p>{new Date(selectedBudget.endDate).toLocaleDateString()}</p>
                        </div>
                        
                        {/* {selectedBudget.contents?.join(", ")} */}
                        <div className="flex gap-3 m-1 justify-between bg-primary-light rounded p-2">
                            <div className="">
                                <p className="md:text-[18px] text-[14px] mb-2">Contents </p>
                                {
                                    selectedBudget.contents.map( (content, index) => (
                                        <div key={index} className="pl-2 md:text-[15px] text-[13px]" >
                                            <p>{content}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="px-2 ">
                                <p className=" md:text-[18px] text-[14px] mb-2">Cost <span className="text-[15px]">({selectedBudget.unit})</span></p>
                                {
                                    selectedBudget.cost.map( (cost, index) => (
                                        <div key={index} className="md:text-[15px] text-[13px] pr-2" >
                                            <p className="text-right">{cost.toFixed(2)}</p>
                                        </div>
                                    ))
                                }
                                <p className="py-1 pr-2 border-b border-t border-dashed border-black text-right md:text-[15px] text-[13px]">{selectedBudget.cost.reduce((total, num) => total + num, 0).toFixed(2)}</p>
                            </div>   
                        </div>  
                    </div> )
                }
                
            </ReactModal>

            <div className="fixed bottom-12 right-12">
                <a href="/budget/budget-form">
                    <FaPlus
                        size={40}
                        className="cursor-pointer text-white bg-primary-dark p-1 rounded-full shadow-lg hover:opacity-75 transition ease-out duration-300"
                    />
                </a>
            </div>

        </div>
    );
}
