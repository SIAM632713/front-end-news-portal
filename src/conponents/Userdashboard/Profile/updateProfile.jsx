import React, {useState} from 'react';
import {X} from "lucide-react";
import {useUpdateUserMutation} from "../../../redux/feature/user/userAPI.js";
import {useSelector} from "react-redux";
import {getBaseURL} from "../../../utilitis/utilitis.js";
import axios from "axios";
import ButtonLoader from "./buttonLoader.jsx";

const UpdateProfile = ({isModalOpen,HandleModalclose}) => {
    if(!isModalOpen) return null;

    const {user}=useSelector((state)=>state.auth)
    const [updateUser,{isLoading}]=useUpdateUserMutation()

    const [uploading, setUploading] = useState(false);

    const [inputForm,setinputForm] = useState({
        username:"",
        profileImage:null,
        bio:"",
        profession:"",
    })

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setinputForm((prev) => ({
                ...prev,
                Image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const HandleonChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            handleImageUpload(files[0]);
        } else {
            setinputForm({
                ...inputForm,
                [name]: value,
            });
        }
    };

    const HandleonSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)

        // if (!inputForm.username || !inputForm.bio || !inputForm.profession || !inputForm.profileImage) {
        //     alert("Please fill in all required fields.");
        //     return;
        // }
        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                image: inputForm.Image,
            });

            const imageUrl = imageUploadResponse.data;

            const userData = {
                username: inputForm.username,
                bio: inputForm.bio,
                profession: inputForm.profession,
                profileImage: imageUrl,
            };

            await updateUser({ id: user?._id, updateUser:userData }).unwrap();
            alert("profile updated successfully.");
        } catch (err) {
            console.error('Error uploading image:', err);
        }finally {
            setUploading(false);
        }
    };




    return (
        <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
                <button
                    onClick={HandleModalclose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={20}/>
                </button>
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={HandleonSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            value={inputForm.username}
                            onChange={HandleonChange}
                            type="text"
                            name="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Image </label>
                        <input
                            onChange={HandleonChange}
                            type="file"
                            name="profileImage"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={inputForm.bio}
                            onChange={HandleonChange}
                            name="bio"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profession</label>
                        <input
                            value={inputForm.profession}
                            onChange={HandleonChange}
                            type="text"
                            name="profession"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || uploading}
                        className={`w-full py-2 rounded-md text-white flex justify-center items-center cursor-pointer ${
                            isLoading || uploading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isLoading || uploading ? <ButtonLoader text="Saving..."/> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;