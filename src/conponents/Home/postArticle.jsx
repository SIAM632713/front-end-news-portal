import React from 'react';
import {useGetAllArticlesQuery} from "../../redux/feature/articleAPI/articleAPI.js";
import Loading from "../Loading/Loading.jsx";


const PostArticle = () => {

    const {data,error,isLoading}=useGetAllArticlesQuery()
    const newsData=data?.data || []

    if(isLoading ) return (
        <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    )

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load articles.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold mb-6">Recent Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {newsData.map((item,index) => (
                    <div
                        key={index}
                        className="border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
                    >
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-base mb-1 truncate">{item.title}</h3>
                            <p className="text-sm text-gray-500 italic mb-4">{item.category}</p>
                            <button
                                className={`w-full py-2 px-4 rounded-md text-sm font-medium border border-gray-300 text-black hover:bg-blue-600 hover:text-white cursor-pointer ${item.buttonStyle}`}
                            >
                                Read Article
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostArticle;
