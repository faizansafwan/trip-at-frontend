import { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";


export default function BudgetForm() {

    const [budgetList, setBudgetList ] = useState([]);
    const [budgetContent, setBudgetContent] = useState('');
    const [cost, setCost] = useState('');
    const [subBudgetContent, setSubBudgetContent] = useState('');
    const [subCost, setSubCost] = useState('');
    const [showSubInput, setShowSubInput] = useState(false);

    // Corrected: Fixed typo in the event handler function
    const handleBudgetNameChange = (e) => {
        setBudgetContent(e.target.value);
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    const handleSubBudgetContent = (e) => {
        setSubBudgetContent(e.target.value);
    }

    const handleSubCost = (e) => {
        setSubCost(e.target.value);
    }

    const handleAddBudget = () => {
        if(budgetContent.trim() && cost.trim()) {
            setBudgetList([...budgetList, { budget: budgetContent, cost} ]);
            setBudgetContent('');  // Clear the input field after adding
            setCost('');           // Clear the cost field after adding
        }
    };

    const toggleSubInput = () => {
        setShowSubInput(!showSubInput);
    }


    return(
        <div className="mt-[80px] mx-8">
            <div className="my-4">
                <h2 className="text-[20px] font-[600]">Plan Your Budget</h2>
            </div>

            <div className="p-2 px-4 bg-primary-light my-4">

                <div className="flex justify-center">
                    <div className=" w-[80%]">
                        <input type="text" placeholder="Budget Name" className=" w-full text-center p-2 focus:outline-none focus:border-b-black border-b bg-primary-light text-[18px] font-[500]" />
                    </div>
                </div>
                
                <div className="mt-10">
                    <div className="flex flex-col md:flex-row  gap-5">
                        <div className="w-full md:w-1/2 flex flex-wrap items-center">
                            <label htmlFor="" className="pr-5 text-[17px] font-[500]">Start</label>
                            <input type="text" className="p-2 flex-grow border border-primary outline-primary"/>
                        </div>

                        <div className="w-full md:w-1/2 flex items-center">
                            <label htmlFor="" className="pr-5 text-[17px] font-[500]">Destination</label>
                            <input type="text" className="p-2 flex-grow border border-primary outline-primary"/>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 mt-7">
                        <div className="w-full md:w-1/2 flex flex-wrap items-center">
                            <label htmlFor="" className="pr-5 text-[17px] font-[500]">Start Date</label>
                            <input type="date" className="p-2 flex-grow border border-primary outline-primary"/>
                        </div>

                        <div className="w-full md:w-1/2 flex items-center">
                            <label htmlFor="" className="pr-5 text-[17px] font-[500]">End Date</label>
                            <input type="date" className="p-2 flex-grow border border-primary outline-primary"/>
                        </div>
                    </div>

                </div>

                <div className="mt-10">
                    <select name="" id="" className="p-2 outline-none">
                        <option value="USD">USD</option>
                        <option value="LKR">LKR</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <div className="w-full mt-6 flex justify-center">
                    <table className="w-[90%]">
                        <thead className="">
                            <tr className=" text-left">
                                <th className="text-[18px] p-2">Budget Content</th>
                                <th className="text-[18px] p-2">Cost</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="p-2">

                            {/* Render the list of budget items */}
                            {
                                budgetList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 font-[500]">{index+1}. {item.budget}</td>
                                        <td className="p-2 font-[500]">{Number(item.cost).toFixed(2)}</td>
                                    </tr>
                                ))
                            }

                            
                        </tbody>

                        
                    </table>

                    
                </div>

                <div className="flex mx-5">
                    <div className="w-full md:w-[45%]">
                        <input
                            type="text"
                            onChange={handleBudgetNameChange}
                            value={budgetContent}
                            className="w-[90%] mr-4 p-2 rounded outline-primary-dark border border-primary" />

                        {/* Sub input field */}
                        <div className="flex m-2 w-full items-center ">
                            <FaRegPlusSquare size={20} className="text-primary-dark" onClick={toggleSubInput} />
                            { showSubInput &&
                                (
                                    <input type="text" onChange={handleSubBudgetContent} value={subBudgetContent} className="ml-3 p-1 rounded outline-primary-dark border border-primary" />
                                )
                            }
                            
                        </div>
                        
                    </div>
                    <div className="w-full md:w-[45%]">
                        <input
                            type="number"
                            onChange={handleCostChange}
                            value={cost}
                            className="w-[90%] mr-4 p-2 rounded outline-primary-dark border border-primary"
                        />
                        {/* Sub input field */}
                        {
                            showSubInput && (
                                <div className="m-2">
                                    <input type="text" onChange={handleSubCost} value={subCost} className="ml-3 p-1 rounded outline-primary-dark border border-primary" />
                                </div>
                            )
                        }
                        
                        
                    </div>
                    <div>
                        <button onClick={handleAddBudget} className="px-3 p-2 bg-primary-dark rounded text-white">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
