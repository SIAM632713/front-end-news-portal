import React, {useState} from 'react';
import {PanelLeftOpen} from "lucide-react";
import UpdateProfile from "./updateProfile.jsx";

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const HandleModalopen=()=>{
        setIsModalOpen(true);
    }
    const HandleModalclose=()=>{
        setIsModalOpen(false);
    }

    return (
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md  mt-10">
            <div className="flex items-center">
                <img
                    src=""
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover mr-6"
                />
                <div>
                    <h2 className="text-xl font-bold">Username: </h2>
                    <p className="text-gray-500 text-sm">User Bio: </p>
                    <p className="text-gray-500 text-sm">Profession:</p>
                </div>
            </div>
            <PanelLeftOpen onClick={HandleModalopen} className="text-gray-500 cursor-pointer hover:text-gray-700"/>
            <UpdateProfile isModalOpen={isModalOpen} HandleModalclose={HandleModalclose}/>
        </div>
    );
};

export default Profile;
