import { FaPlus } from "react-icons/fa";


export default function Budget() {

    const budgetList = [
        { budgetName: 'budget1', cost: '53453'},
        { budgetName: 'budget2', cost: '8879146'},
        { budgetName: 'budget3', cost: '789553'},
        { budgetName: 'budget4', cost: '24353'},
    ];

    return (
        <div className="mt-[80px] mx-8">

            <div className="my-5">
                <h2 className="text-[30px] font-[500]">Budget List</h2>
            </div>


            <div className="grid grid-cols-2 gap-2">
                {
                    budgetList.map( (budget, index) => (
                        <div key={index} className=" cursor-pointer bg-primary-light p-3 rounded flex justify-between hover:opacity-75 transition ease-in duration-300">
                        
                            <div className="py-2 font-[500]">
                                {budget.budgetName}
                            </div>
                            <div className="py-2 font-[500]">
                                Rs.{Number(budget.cost).toFixed(2)}
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="fixed bottom-12 right-12">
                <a href="/budget/budget-form"><FaPlus size={40} className=" cursor-pointer text-white bg-primary-dark p-1 rounded-full shadow-lg hover:opacity-75 transition ease-out duration-300" /></a>
            </div>
            
                
                
            
        </div>
    )
}