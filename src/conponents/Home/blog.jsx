import React from 'react';
import image from "../../assets/news-laptop-computer-isolated-white-19625034.webp";

const Blog = () => {
    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between bg-yellow-100 border border-green-300 rounded-lg p-12 mt-15">
                {/* Left content */}
                <div className="flex-1 pr-10">
                    <h2 className="text-2xl font-semibold text-center mb-2">
                        Want to know more about today&apos;s <span className="text-red-600 font-bold">TOP 10</span> news?
                    </h2>
                    <p className="text-center text-gray-700 mb-4">Checkout these top news articles!</p>
                    <div className="text-center">
                        <button className="bg-blue-600 w-full hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold cursor-pointer">
                            Stay Updated with Daily News: Your Go-To Resources
                        </button>
                    </div>
                </div>

                {/* Right image */}
                <div className="w-[400px] h-[270px] flex-shrink-0">
                    <img
                        src={image}
                        alt="News"
                        className="rounded-md w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Blog;
