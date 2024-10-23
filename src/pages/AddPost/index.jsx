import Rating from "react-stars";
import LeftNav from "../../components/LeftNavigation";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function AddPost() {
  const [newForm, setNewForm] = useState([{ id: Date.now(), isVisible: true }]);

  // Function to add a new form
  const addForm = () => {
    setNewForm([...newForm, { id: Date.now(), isVisible: true }]);
  };

  // Function to remove a form
  const removeForm = (id) => {
    // Trigger exit animation by setting isVisible to false for the selected form
    setNewForm(newForm.map(form => form.id === id ? { ...form, isVisible: false } : form));

    // Remove the form after a delay to let the animation complete
    setTimeout(() => {
      setNewForm(newForm.filter((form) => form.id !== id));
    }, 500); // Match delay to animation duration
  };

  return (
    <div className="mt-[70px] m-3 lg:m-[80px]">
      {/* Header */}
      <div className="text-[30px] font-bold my-6">
        <h2>Add Traveled Location</h2>
      </div>

      {/* Forms Container */}
      {newForm.map((form, index) => (
        <form
          key={index}
          className={`mb-4 transition-all duration-500 ease-in-out transform 
            ${form.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          <div className="p-4 bg-primary-light rounded rounded-md flex flex-col gap-4">
            {/* Visited Place Input */}
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-1/3 font-semibold">Visited Place</label>
              <input type="text" placeholder="e.g., Colombo Lotus Tower" className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
            </div>

            {/* Date Visited Input */}
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-1/3 font-semibold">Date Visited</label>
              <input type="date" placeholder="Select a date" className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
            </div>

            {/* Rate Place */}
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-1/3 font-semibold">Rate Place</label>
              <Rating count={5} size={30} color1="gray" color2={'#316EFF'} half={false} className="w-[200px] z-[50] focus:outline-primary" />
            </div>

            {/* Positive Description */}
            <div className="w-full flex">
              <label htmlFor="" className="w-1/3 font-semibold mt-2">Positive Description</label>
              <textarea placeholder="Write about the positive aspects of the place..." className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
            </div>

            {/* Negative Description */}
            <div className="w-full flex">
              <label htmlFor="" className="w-1/3 font-semibold mt-2">Negative</label>
              <textarea placeholder="Write about the negative aspects of the place..." className="w-2/3 p-2 border border-primary rounded focus:outline-primary"></textarea>
            </div>

            {/* Add Images */}
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-1/3 font-semibold">Add Images</label>
              <div className="w-2/3 flex items-center gap-4">
                {/* Hidden file input */}
                <input
                  type="file"
                  multiple
                  id={`file-input-${index}`} // Unique ID for each form's file input
                  style={{ display: 'none' }} // Hide the default input
                 
                />
                {/* Custom button to trigger file input */}
                <label htmlFor={`file-input-${index}`} className="cursor-pointer flex items-center">
                  <FaPlus size={55} className="text-primary-dark border border-dashed border-primary-dark p-2 rounded hover:opacity-75 focus:outline-primary" />
                </label>
                
              </div>
            </div>

            {/* Additional Information */}
            <div className="w-full flex">
              <label htmlFor="" className="w-1/3 font-semibold mt-2">Additional Information</label>
              <textarea placeholder="Add any additional information about your experience..." className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
            </div>

            {/* Remove Form Button */}
            <div className="my-5 mr-4 flex justify-end">
              <FaTrashAlt
                className="cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
                size={20}
                onClick={() => removeForm(form.id)}
              />
            </div>


          </div>

          
        </form>
      ))}

      {/* Add More Location Button */}
      <div className="flex flex-col items-center justify-center my-5 gap-1">
        <button onClick={addForm} className="flex flex-col items-center justify-center gap-1
          hover:opacity-75 transition ease-in-out duration-300">
          <FaPlus size={35} className="text-primary-dark border border-primary-dark" />
          <p className="text-primary-dark text-[18px] inline-block">Add More Location</p>
        </button>
      </div>

      <div className="flex justify-end">
        <button className="p-3 bg-primary-dark text-white font-[500] rounded rounded-2 hover:opacity-75 transition ease-in-out duration-300">Upload Trip</button>
      </div>
      
    </div>
  );
}
