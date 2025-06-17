import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="px-4 py-16 text-start sm:py-24 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    <span className="text-blue-700">Welcome to</span>{' '}
                    <span className="text-red-600">Morning Dispatch</span>
                </h1>
                <p className="mt-4 text-gray-600 text-base sm:text-lg">
                    Your trusted source for the latest headlines, in-depth analysis, and breaking news every morning.
                </p>
                <p className="mt-2 italic text-gray-500 text-sm sm:text-base">
                    Stay informed, stay ahead.
                </p>
                <div className="mt-6">
                    <Link to="/news-article">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition duration-300 cursor-pointer">
                            View all posts →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
