import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, signOut } from "../../store/userSlice";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import userImg from '../../assets/user-profile.jpeg';
import ReactModal from "react-modal";
import { uploadImage } from "../../utils/uploadImage";

export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);
    const error = useSelector((state) => state.user.error);
    const status = useSelector((state) => state.user.status);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editUser, setEditUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        profilePicture: ""
    });

    useEffect(() => {
        dispatch(currentUser());
        if (user) {
            setEditUser({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: user.profilePicture, 
            });
        }
    }, [dispatch, user]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {

        try {
            setUploading(true);

            // Upload profile picture to Firebase if a file is selected
            let profilePictureURL = editUser.profilePicture;
            if (selectedFile) {
                profilePictureURL = await uploadImage(selectedFile, "trips");
                console.log("Uploaded image URL:", profilePictureURL);
            }

            // Update user data with the new profile picture URL
            const updatedUser = {
                ...editUser,
                profilePicture: profilePictureURL
            };
            console.log("Updated user info:", updatedUser);

            // Dispatch an action to update the user in the backend (optional)
            // dispatch(updateUserAction(updatedUser));

            closeModal();
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setUploading(false);
        }

        // Dispatch action to update user information
        console.log("Updated user info: ", editUser);
        closeModal();
    };

    const handleSignout = () => {
        localStorage.removeItem("token");
        dispatch(signOut());
        navigate("/login");
    };

    if (status === "failed") return <p className="text-red-400 m-10">Error: {error}</p>;

    return (
        <div className="">
            <Header />
            {user ? (
                <div className="mt-[80px] flex flex-col items-center border p-3">
                    <div className="my-5">
                    <img
                            src={user.profilePicture || userImg}
                            alt="User Profile"
                            className="rounded-full"
                            width={"80px"}
                            height={"80px"}
                        />
                        
                    </div>

                    <div className="text-left">
                        <b>First Name</b> {user.firstName}
                    </div>
                    <div className="text-left">
                        <b>Last Name</b> {user.lastName}
                    </div>
                    <div className="text-left">
                        <b>Email</b> {user.email}
                    </div>

                    <div className="my-5 flex gap-3">
                        <button className="text-primary-dark font-bold" onClick={handleSignout}>
                            Signout
                        </button>
                        <button className="text-primary-dark" onClick={openModal}>
                            Edit Profile
                        </button>
                    </div>

                    {/* React Modal */}
                    <ReactModal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.75)",
                            },
                            content: {
                                color: "lightsteelblue",
                                borderRadius: "10px",
                                padding: "20px",
                                height: '70%',
                                maxWidth: "500px",
                                margin: "auto",
                            },
                        }}
                    >
                        <h2 className="font-[500]">Edit Profile</h2>
                        <form>

                        <div className="my-5 flex flex-col items-center gap-2">
                            <img
                                src={
                                    selectedFile
                                        ? URL.createObjectURL(selectedFile)
                                        : editUser.profilePicture || userImg
                                }
                                alt="User Profile"
                                className="rounded-full"
                                width={"80px"}
                                height={"80px"}
                            />
                            {/* Hidden file input */}
                            <input 
                                type="file" 
                                id="profilePictureInput" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange} 
                            />
                            {/* Label associated with the input */}
                            <label 
                                htmlFor="profilePictureInput" 
                                className="text-primary-dark cursor-pointer">
                                Update Profile
                            </label> 
                        </div>

                            <div className="my-3">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={editUser.firstName}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={editUser.lastName}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email" disabled
                                    id="email"
                                    name="email" 
                                    value={editUser.email}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    type="button"
                                    className="bg-primary text-white px-4 py-2 rounded"
                                    onClick={handleSave}
                                    disabled={uploading}
                                >
                                    {uploading ? "Saving..." : "Save"}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </ReactModal>
                </div>
            ) : (
                <div className="mt-[80px]">
                    <p className="text-primary-dark m-10">Loading profile...</p>
                </div>
            )}
        </div>
    );
}
