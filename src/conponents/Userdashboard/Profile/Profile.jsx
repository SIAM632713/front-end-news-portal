import React from 'react';
import { User } from 'lucide-react';

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white p-4">
            <h2 className="text-2xl font-semibold mb-6">Update Your Profile</h2>

            <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center mb-6 shadow-md">
                <User className="text-white" size={40} />
            </div>

            <form className="w-full max-w-sm space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 cursor-pointer"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
