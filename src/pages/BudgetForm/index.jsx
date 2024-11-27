import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { postBudget } from "../../store/budgetSlice";
import { currentUser } from "../../store/userSlice";

export default function BudgetForm() {
    
    const user = useSelector( (state) => state.user.user);
    const userStatus = useSelector( (state) => state.user.status);
    const userError = useSelector( (state) => state.user.error);

    const [budgetContent, setBudgetContent] = useState('');
    const [cost, setCost] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        email: user.email,
        budgetName: '',
        start: '',
        destination: '',
        startDate: '',
        endDate: '',
        unit: '',
        contents: [],
        cost: [],
    });

    const dispatch = useDispatch();

    


    const budgetStatus = useSelector((state) => state.budget.status);
    const error = useSelector((state) => state.budget.error);


    useEffect( () => {
        if (userStatus === 'succeeded') {
            dispatch(currentUser());
        }
        
    }, [dispatch, userStatus]);


    const handleBudgetNameChange = (e) => {
        setBudgetContent(e.target.value);
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddBudget = () => {
        if (budgetContent.trim() && cost.trim()) {
            const numericCost = parseFloat(cost);
            if (!isNaN(numericCost)) {
                setFormData((prevData) => ({
                    ...prevData,
                    contents: [...prevData.contents, budgetContent],
                    cost: [...prevData.cost, numericCost],
                }));

                setBudgetContent('');
                setCost('');
                setTotalCost((prevTotal) => prevTotal + numericCost);
            }
        }
    };

    const handleRemoveBudget = (index) => {
        setFormData((prevData) => {
            const updatedContents = [...prevData.contents];
            const updatedCosts = [...prevData.cost];
            const removedCost = updatedCosts[index];

            updatedContents.splice(index, 1);
            updatedCosts.splice(index, 1);

            setTotalCost((prevTotal) => prevTotal - removedCost);

            return {
                ...prevData,
                contents: updatedContents,
                cost: updatedCosts,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data to send
        const budgetData = {
            email: formData.email,
            budgetName: formData.budgetName,
            start: formData.start,
            destination: formData.destination,
            startDate: formData.startDate,
            endDate: formData.endDate,
            unit: formData.unit,
            contents: formData.contents,
            cost: formData.cost,
        };
        console.log(budgetData);
        // Dispatch the action to post the budget data
        dispatch(postBudget(budgetData))
            .then(() => {
                setMessage('Budget successfully posted!');
                setFormData({
                    email: 'ads@gmail.com',
                    budgetName: '',
                    start: '',
                    destination: '',
                    startDate: '',
                    endDate: '',
                    unit: '',
                    contents: [],
                    cost: [],
                }); // Reset form after successful submit
                setTotalCost(0);
            })
            .catch((error) => {
                setMessage(error.message || 'An error occurred while posting the budget');
            });
    };

    return (
        <div className="mt-[80px] mx-8">
            <div className="my-4">
                <h2 className="text-[20px] font-[600]">Plan Your Budget</h2>
            </div>

            <div className="p-2 px-4 bg-primary-light my-4 pb-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <div className="w-[80%]">
                            <input
                                type="text"
                                name="budgetName"
                                value={formData.budgetName}
                                onChange={handleChange}
                                placeholder="Budget Name"
                                className="w-full text-center p-2 focus:outline-none focus:border-b-black border-b bg-primary-light text-[18px] font-[500]"
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full md:w-1/2 flex flex-wrap items-center">
                                <label htmlFor="" className="pr-5 text-[17px] font-[500]">Start</label>
                                <input
                                    type="text"
                                    name="start"
                                    value={formData.start}
                                    onChange={handleChange}
                                    className="p-2 flex-grow border border-primary outline-primary"
                                />
                            </div>

                            <div className="w-full md:w-1/2 flex items-center">
                                <label htmlFor="" className="pr-5 text-[17px] font-[500]">Destination</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className="p-2 flex-grow border border-primary outline-primary"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5 mt-7">
                            <div className="w-full md:w-1/2 flex flex-wrap items-center">
                                <label htmlFor="" className="pr-5 text-[17px] font-[500]">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="p-2 flex-grow border border-primary outline-primary"
                                />
                            </div>

                            <div className="w-full md:w-1/2 flex items-center">
                                <label htmlFor="" className="pr-5 text-[17px] font-[500]">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="p-2 flex-grow border border-primary outline-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="p-2 outline-none"
                        >
                            <option value="USD">USD</option>
                            <option value="LKR">LKR</option>
                            <option value="INR">INR</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>

                    <div className="w-full mt-6 flex justify-center">
                        <table className="w-[90%]">
                            <thead>
                                <tr className="text-left">
                                    <th className="text-[18px] p-2">Budget Content</th>
                                    <th className="text-[18px] p-2">Cost</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody className="p-2">
                                {formData.contents.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 font-[400]">{index + 1}. {item}</td>
                                        <td className="p-2 font-[400]">{Number(formData.cost[index]).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="text-red-400"
                                                onClick={() => handleRemoveBudget(index)}
                                            >
                                                <FaX size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex mx-5">
                        <div className="w-full md:w-[45%]">
                            <input
                                type="text"
                                onChange={handleBudgetNameChange}
                                value={budgetContent}
                                className="w-[90%] mr-4 p-2 rounded outline-primary-dark border border-primary"
                            />
                        </div>

                        <div className="w-full md:w-[45%]">
                            <input
                                type="number"
                                onChange={handleCostChange}
                                value={cost}
                                className="w-[90%] mr-4 p-2 rounded outline-primary-dark border border-primary"
                            />
                        </div>

                        <div>
                            <input type="button" value={'Add'} onClick={handleAddBudget} className="px-3 p-2 bg-primary rounded text-white" />
                        </div>
                    </div>

                    <div className="flex m-5 p-1 border-black border-b border-t items-center">
                        <div className="w-[65%]">
                            <p className="mr-4 p-2 rounded font-[500]">Total Costs</p>
                        </div>

                        <div>
                            <p>{totalCost.toFixed(2)}</p>
                        </div>
                    </div>

                    {userError && <div className="text-red-500 m-5 text-center">{userError}</div>}
                    {error && <div className="text-red-500 m-5 text-center">{error}</div>}
                    {budgetStatus === 'succeeded' && <div className="text-green-300 m-5 text-center">{message}</div>}

                    <div className="flex justify-end m-5">
                        <button type="submit" className="bg-primary-dark p-2 text-white rounded focus:opacity-75">
                            {budgetStatus === 'loading' ? 'Uploading' : 'Add Budget'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
