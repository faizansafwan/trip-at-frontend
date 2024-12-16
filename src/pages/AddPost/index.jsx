import Rating from "react-stars";
import LeftNav from "../../components/LeftNavigation";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTravel } from "../../store/travelSlice";
import { currentUser } from "../../store/userSlice";
import { uploadImage } from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom";



export default function AddPost() {
  const dispatch = useDispatch();
  const travelStatus = useSelector((state) => state.travel.status);
  const travelError = useSelector((state) => state.travel.error);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const [successMessage, setSuccessMessage] = useState("");  // State for success message
  const [errorMessage, setErrorMessage] = useState("");  // State for error message (fields empty)
  const [loadingImageId, setLoadingImageId] = useState(null);


  const [newForm, setNewForm] = useState([{ id: Date.now(), isVisible: true }]);

  const [formData, setFormData] = useState([
    {
      id: Date.now(),
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userProfile: user?.profilePicture || "",
      location: "",
      dateVisited: "",
      ratePlace: 0,
      positiveDesc: "",
      negativeDesc: "",
      images: [],
      additionalInfo: "",
    },
  ]);

  // Fetch current user on mount
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  // Update form data with user info when the user state is updated
  useEffect(() => {
    if (user) {
      setFormData((prevFormData) =>
        prevFormData.map((form) => ({
          ...form,
          firstName: user.firstName,
          lastName: user.lastName,
          userProfile: user.profilePicture,
        }))
      );
    }
    else if (userStatus === 'failed') {
      navigate('/login');
    }
  }, [ navigate, user, userStatus]);

  const validateForm = () => {
    // Check that all required fields are filled
    for (let form of formData) {
      if ( !form.location || !form.dateVisited || !form.additionalInfo ||form.ratePlace === 0 ) {
        return false; // Return false if any required field is empty
      }
    }
    return true; // All required fields are filled
  };

  // Add a new form entry
  const addForm = () => {
    const newId = Date.now();
    setNewForm([...newForm, { id: newId, isVisible: true }]);
    setFormData([
      ...formData,
      {
        id: newId,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        userProfile: user?.profilePicture || "",
        location: "",
        dateVisited: "",
        ratePlace: 0,
        positiveDesc: "",
        negativeDesc: "",
        images: [],
        additionalInfo: "",
      },
    ]);
  };

  // Remove a form entry
  const removeForm = (id) => {
    setNewForm(newForm.filter((form) => form.id !== id));
    setFormData(formData.filter((form) => form.id !== id));
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormData((prevFormData) =>
      prevFormData.map((form) =>
        form.id === id ? { ...form, [name]: value } : form
      )
    );
  };

  const handleRatingChange = (rate, id) => {
    setFormData((prevFormData) =>
      prevFormData.map((form) =>
        form.id === id ? { ...form, ratePlace: rate } : form
      )
    );
  };

  // Handle image selection and upload
  const handleImageChange = async (e, id) => {
    const files = Array.from(e.target.files);
    setLoadingImageId(id); // Set loading indicator for this form entry

    try {
      const imageUrls = await Promise.all(
        files.map((file) => uploadImage(file, "trips"))
      );
      setFormData((prevFormData) =>
        prevFormData.map((form) =>
          form.id === id ? { ...form, images: [...form.images, ...imageUrls] } : form
        )
      );
    } catch (error) {
      setErrorMessage("Image upload failed. Please try again.");
      setTimeout(() => setErrorMessage(""), 10000);
    } finally {
      setLoadingImageId(null); // Remove loading indicator once upload is done
    }

  };


  const handleSubmit = async (e) => {

    // Check if the user is logged in
    if (!user || userStatus !== "succeeded") {
      setErrorMessage("You are not logged in. Please log in to submit a trip.");
      navigate('/login');
      setTimeout(() => {
        setErrorMessage(""); // Clear the error message after 10 seconds
      }, 10000);

      return; // Stop the form submission
    }

    if (!validateForm()) {
      
      setErrorMessage("Please fill out all required fields.");

      setTimeout ( () => {
        setErrorMessage("");

      }, 10000);
      
      return;
    }

    // Filter out `id` field before sending the data
    const dataWithoutIds = formData.map(({ id, ...rest }) => rest);
    console.log("Button clicked, form data:", formData);

    try {

      await dispatch(postTravel(dataWithoutIds)); // Post data without `id`

      // Set success message
      setSuccessMessage("Trip uploaded successfully!");

      // Hide the success message after 10 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Reset the message
      }, 10000);

      // Clear error message if the form is valid
      setErrorMessage("");

    } 
    catch (error) {
      // Set error message if dispatch fails
      setErrorMessage(error || "Failed to upload the trip.");
      setTimeout(() => setErrorMessage(""), 10000); // Clear error message after 10s
    }
      
  };

  return (
    <div className="mt-[70px] m-3 lg:m-[80px]">
      <div className="text-[30px] font-bold my-6">
        <h2>Add Traveled Location</h2>
      </div>

      {travelStatus === "failed" && travelError && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          <p>{travelError}</p>
        </div>
      )}

      {newForm.map((form, index) => (
        <form
          onSubmit={handleSubmit}
          key={index}
          className={`mb-4 transition-all duration-500 ease-in-out transform 
            ${form.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} >

          {/* visited place */}
          <div className="p-4 bg-primary-light rounded rounded-md flex flex-col gap-4">
            <div className="w-full flex items-center">
              <label className="w-1/3 font-semibold">Visited Place</label>
              <input type="text" name="location" value={formData[index].location} 
                placeholder="e.g., Colombo Lotus Tower" onChange={(e) => handleInputChange(e, form.id)}
                className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
            </div>

            {/* Date visited */}
            <div className="w-full flex items-center">
              <label className="w-1/3 font-semibold">Date Visited</label>
              <input
                type="date"
                name="dateVisited"
                value={formData[index].dateVisited}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"
              />
            </div>

            {/* Rate place */}
            <div className="w-full flex items-center">
              <label className="w-1/3 font-semibold">Rate Place</label>
              <Rating
                count={5}
                size={30}
                color1="gray"
                color2={"#316EFF"}
                half={false}
                value={formData[index].ratePlace}
                onChange={(rate) => handleRatingChange(rate, form.id)}
                className="w-[200px] z-[50] focus:outline-primary"
              />
            </div>

            {/* Positive description */}
            <div className="w-full flex">
              <label className="w-1/3 font-semibold mt-2">Positive Description</label>
              <textarea
                placeholder="Write about the positive aspects of the place..."
                name="positiveDesc"
                value={formData[index].positiveDesc}
                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"
                onChange={(e) => handleInputChange(e, form.id)}
              />
            </div>

            {/* Negative description */}
            <div className="w-full flex">
              <label className="w-1/3 font-semibold mt-2">Negative Description</label>
              <textarea
                placeholder="Write about the negative aspects of the place..."
                name="negativeDesc"
                value={formData[index].negativeDesc}
                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"
                onChange={(e) => handleInputChange(e, form.id)}
              />
            </div>

            {/* image upload and preview */}
            <div className="w-full flex items-center">
              <label className="w-1/3 font-semibold">Add Images</label>
              <div className="w-2/3 flex items-center gap-4">
                <input
                  type="file" multiple id={`file-input-${index}`}
                  onChange={(e) => handleImageChange(e, form.id)} style={{ display: "none" }} />
                <label htmlFor={`file-input-${index}`} className="cursor-pointer flex items-center" >
                  <FaPlus size={55} className="text-primary-dark border border-dashed border-primary-dark p-2 rounded" />
                </label>
              </div>
            </div>
            {/* Display uploaded images */}
            {formData[index].images?.map((url, imgIndex) => (
              <img key={imgIndex} src={url} alt="Uploaded" style={{ width: "100px", margin: "5px" }} />
            ))}

            {/* Loading Indicator */}
            {loadingImageId === form.id && (
              <div className="flex gap-2">
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-primary-dark" role="status">
                  <span className="visually-hidden"></span>
                </div>
                <div className="text-primary">
                  <p>Loading...</p>
                </div>
              </div>
              
            )}

            <div className="w-full flex">
              <label className="w-1/3 font-semibold mt-2">Additional Information</label>
              <textarea
                placeholder="Add any additional information about your experience..."
                name="additionalInfo"
                value={formData[index].additionalInfo}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"
              />
            </div>

            <div className="my-5 mr-4 flex justify-end">
              <FaTrashAlt
                className="cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
                size={20}
                onClick={() => removeForm(form.id)} />
            </div>
          </div>
            
        </form>
      ))}

      <div className="flex flex-col items-center justify-center my-5 gap-1">
        <button
          onClick={addForm}
          className="flex flex-col items-center justify-center gap-1
          hover:opacity-75 transition ease-in-out duration-300"
        >
          <FaPlus size={35} className="text-primary-dark border border-primary-dark" />
          <p className="text-primary-dark text-[18px] inline-block">Add More Location</p>
        </button>
      </div>

      {/* Display Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-100 text-green-700 text-center rounded mb-4">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Error message for empty fields */}
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 text-center rounded mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="p-3 bg-primary-dark text-white font-[500] rounded rounded-2 hover:opacity-75 transition ease-in-out duration-300"
          onClick={handleSubmit} >
          {travelStatus === 'loading' ? 'Loading...' : 'Upload Trip'}
        </button>
      </div>
    </div>
  );
}

