import { FaCalendarDay, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteBudget, fetchBudgetByEmail, fetchBudgetById } from "../../store/budgetSlice";
import { useEffect, useState } from "react";
import { currentUser } from "../../store/userSlice";
import ReactModal from "react-modal";
import { FaEllipsis, FaLocationDot, FaX } from "react-icons/fa6";

export default function Budget() {
    const budgets = useSelector((state) => state.budget.budget);
    const selectedBudget = useSelector((state) => state.budget.selectedBudget);
    const status = useSelector((state) => state.budget.status);
    const error = useSelector((state) => state.budget.error);
    const [message, setMessage] = useState("");

    const [id, setId] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); // Track which menu is open

    const user = useSelector((state) => state.user.user);

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

    const closeModal = () => setModalIsOpen(false);

    const handleId = (budgetId) => {
        setId(budgetId);
        setModalIsOpen(true);
    };

    const handleDelete = (budgetId) => {
        dispatch(deleteBudget(budgetId));
        setMessage("Budget deleted successfully");
        setActiveMenu(null); // Close the dropdown after deletion

        setTimeout ( () => {
            setMessage('');
        }, 10000);
    };

    const toggleMenu = (budgetId) => {
        setActiveMenu(activeMenu === budgetId ? null : budgetId); // Toggle menu visibility
    };

    return (
        <div className="mt-[80px] mx-8">
            <div className="my-5">
                <h2 className="text-[30px] font-[500]">Budget List</h2>
            </div>

            {status === "loading" && <p>Loading...</p>}
            {/* {status === "failed" && <p>Error: {error}</p>} */}

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                {Array.isArray(budgets) && budgets.length > 0 ? (
                    budgets.map((budget) => (
                        <div key={budget._id}>
                            <div className="cursor-pointer bg-primary-light p-3 rounded flex justify-between hover:opacity-75 transition ease-in duration-300">
                                <div className="py-2 font-[500]" onClick={() => handleId(budget._id)}>
                                    {budget.budgetName}
                                </div>
                                <div className="py-2 font-[500]" onClick={() => handleId(budget._id)}>
                                    Rs. {budget.cost.reduce((total, num) => total + num, 0).toFixed(2)}
                                </div>
                                <div className="p-2 relative">
                                    <button onClick={() => toggleMenu(budget._id)}>
                                        <FaEllipsis size={20} />
                                    </button>
                                    {activeMenu === budget._id && (
                                        <div className="absolute right-0 mt-2 w-[100px] bg-white border rounded shadow-md">
                                            <button
                                                onClick={() => handleDelete(budget._id)}
                                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

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
                        height: "auto%",
                        maxWidth: "60%",
                        margin: "auto",
                        zIndex: 120,
                    },
                }} >
                {selectedBudget && (
                    <div className="m-5">
                        <div className="flex justify-end cursor-pointer">
                            <button onClick={closeModal}>
                                <FaX size={20} />
                            </button>
                        </div>

                        <div className="mb-5">
                            <h2 className="text-center md:text-[25px] text-[20px]">{selectedBudget.budgetName}</h2>
                        </div>

                        <div className="flex gap-2 md:text-[18px] m-3 text-[12px]">
                            <p className="text-primary">
                                <FaLocationDot className="md:w-6 md:h-6 w-4 h-4" />
                            </p>
                            <p>{selectedBudget.start}</p>
                            <p>{"-->"}</p>
                            <p>{selectedBudget.destination}</p>
                        </div>

                        <div className="flex gap-3 md:text-[18px] m-3 text-[12px]">
                            <p className="text-primary">
                                <FaCalendarDay className="md:w-6 md:h-6 w-4 h-4" />
                            </p>
                            <p>{new Date(selectedBudget.startDate).toLocaleDateString()}</p>
                            <p>{"-->"}</p>
                            <p>{new Date(selectedBudget.endDate).toLocaleDateString()}</p>
                        </div>

                        <div className="flex gap-3 m-1 justify-between bg-primary-light rounded p-2">
                            <div>
                                <p className="md:text-[18px] text-[14px] mb-2">Contents </p>
                                {selectedBudget.contents.map((content, index) => (
                                    <div key={index} className="pl-2 md:text-[15px] text-[13px]">
                                        <p>{content}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="px-2">
                                <p className="md:text-[18px] text-[14px] mb-2">
                                    Cost <span className="text-[15px]">({selectedBudget.unit})</span>
                                </p>
                                {selectedBudget.cost.map((cost, index) => (
                                    <div key={index} className="md:text-[15px] text-[13px] pr-2">
                                        <p className="text-right">{cost.toFixed(2)}</p>
                                    </div>
                                ))}
                                <p className="py-1 pr-2 border-b border-t border-dashed border-black text-right md:text-[15px] text-[13px]">
                                    {selectedBudget.cost.reduce((total, num) => total + num, 0).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </ReactModal>

            {status === "succeeded" && message && <div className="text-green-600 mt-5 text-center">{message}</div>}

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
