import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget , fetchBudgetByEmail} from "../../store/budgetSlice";
import { useEffect } from "react";
import { currentUser } from "../../store/userSlice";

export default function Budget() {
    const budgets = useSelector((state) => state.budget.budget);
    const status = useSelector((state) => state.budget.status);
    const error = useSelector((state) => state.budget.error);

    const user = useSelector( (state) => state.user.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
           dispatch(fetchBudgetByEmail(user.email)); 
        }
        
    }, [dispatch, user]);

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
                    budgets.map((budget, index) => (
                        <div
                            key={index}
                            className="cursor-pointer bg-primary-light p-3 rounded flex justify-between hover:opacity-75 transition ease-in duration-300"
                        >
                            <div className="py-2 font-[500]">{budget.budgetName}</div>
                            <div className="py-2 font-[500]">
                                {/* Calculate and display the total */}
                                Rs. {budget.cost.reduce((total, num) => total + num, 0).toFixed(2)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No budgets available.</p>
                )}
            </div>
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
