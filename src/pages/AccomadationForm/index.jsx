import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { postAccomadation } from "../../store/AccomadationSlice";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { uploadImage } from "../../utils/uploadImage";
import { postAccomadation } from "../../store/AccomadationSlice";


export default function AccomadationForm() {


    const accomadation = useSelector( (state) => state.accomadation.post);
    const status = useSelector( (state) => state.accomadation.status);
    const postError = useSelector( (state) => state.accomadation.error);

    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(
        {
            name: "",
            address: "",
            phone: "",
            email: "",
            description: "",
            type: "",
            unit: "",
            price: "", 
            images: [],
        },
    );
    
    // Handle image uploads
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    try {
      const imgUrls = await Promise.all(
        files.map((file) => uploadImage(file, "accommodation"))
      );

      // Append uploaded image URLs to the form data
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imgUrls],
      }));
    } catch (error) {
      console.error("Error uploading images:", error.message);
      setError("Failed to upload images. Please try again.");
    }
  };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation (example: ensure required fields are filled)
        if (!formData.name || !formData.address || !formData.price || !formData.type || !formData.images) {
            setError("Please fill all required fields.");
            return;

        }

        setError("");
        setSuccess('');
        setIsSubmitting(true);

        try {
            const data = 
                {
                    name: formData.name,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    description: formData.description,
                    type: formData.type,
                    unit: formData.unit,
                    price: formData.price,
                    images: formData.images,
                }
            

            const result = await dispatch(postAccomadation(data));
            console.log(result);
            

            if (result) {
                setSuccess('Resident Posted Successfully!');

                // Clear form data
                setFormData({
                    name: "",
                    address: "",
                    phone: "",
                    email: "",
                    description: "",
                    type: "",
                    unit: "",
                    price: "",
                    images: [],
                });

                setTimeout( () => {
                    setSuccess('');
                }, 10000);

                setError('');
            } 
            else {
                setError(postError);
            }

        }
        catch (error) {
            setError("An error occurred while submitting the form: ", postError);

            setTimeout( () => {
                setError("");
            }, 10000);

        } finally {
            setIsSubmitting(false);
        }
        
    } 


    return (
        <div className="mt-[80px] mx-8">
            <div className="text-[30px] font-bold my-6">
                <h2>Add Your Residence </h2>
            </div>

            <div>
                <form onSubmit={handleSubmit} className={`mb-4 transition-all duration-500 ease-in-out transform`} >

                    
                    <div className="p-4 bg-primary-light rounded rounded-md flex flex-col gap-4">
                        {/* Residence Name */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Residence Name</label>
                            <input type="text" name="name" value={formData.name} 
                                placeholder="e.g. Lotus Hotel" onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
                        </div>

                        {/* Address */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Residence Address</label>
                            <input
                                type="text" placeholder="E 43 colombo road, Kandy"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"
                            />
                        </div>

                        {/* phone */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Phone Number </label>
                            <input type="number" name="phone" value={formData.phone} 
                                placeholder="+94711234567" onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
                        </div>
                        
                        {/* email */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Email</label>
                            <input type="email" name="email" value={formData.email} 
                                placeholder="example@gmail.com" onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary" />
                        </div>

                        {/* description */}
                        <div className="w-full flex">
                            <label className="w-1/3 font-semibold mt-2">Description</label>
                            <textarea
                                placeholder="Write detail information about your residence..."
                                name="description" value={formData.description} onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"  
                            />
                        </div>

                        {/* Residence type */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Type</label>
                            <select name="type" value={formData.type} onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary" >
                                <option value="">Select Type</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Hostel">Hostel</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Resort">Resort</option>
                            </select>
                        </div>

                        {/* Residence type */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Unit</label>
                            <select name="unit" value={formData.unit} onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary" >
                                <option value="">Select Type</option>
                                <option value="LKR">LKR</option>
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EU">EU</option>
                                <option value="PKR">PKR</option>
                            </select>
                        </div>


                        <div className="w-full flex">
                            <label className="w-1/3 font-semibold mt-2">Price</label>
                            <input type="number" placeholder="Price" name="price" value={formData.price}
                                onChange={handleInputChange}
                                className="w-2/3 p-2 border border-primary rounded focus:outline-primary"
                            />
                        </div>

                        {/* image upload and preview */}
                        <div className="w-full flex items-center">
                            <label className="w-1/3 font-semibold">Add Images</label>
                            <div className="w-2/3 flex items-center gap-4">
                                <input type="file" multiple onChange={handleImageChange} className="hidden" 
                                id="image-upload" />
                                <label htmlFor="image-upload" className="cursor-pointer flex items-center">
                                    <FaPlus size={55}
                                        className="text-primary-dark border border-dashed border-primary-dark p-2 rounded"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Uploaded Images Preview */}
                        <div className="flex gap-2 flex-wrap">
                            {formData.images.map((image, index) => (
                                <img key={index} src={image} alt="Uploaded" className="w-20 h-20 object-cover" />
                            ))}
                        </div>

                        {/* Loading Indicator
                        {loadingImageId && (
                            <div className="flex gap-2">
                                <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-primary-dark" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                                <div className="text-primary">
                                    <p>Loading...</p>
                                </div>
                            </div>
                        )} */}

                        {/* Error Message */}
                        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

                        {/* Success Message */}
                        {success && <div className="text-green-300 mt-2 text-center">{success}</div>}

                        <div className="flex justify-end">
                            <button type="submit" disabled={status === 'loading'} className="p-3 bg-primary-dark text-white font-[500] rounded rounded-2 hover:opacity-75 transition ease-in-out duration-300 ">
                                { status === 'loading' ? 'Submitting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}