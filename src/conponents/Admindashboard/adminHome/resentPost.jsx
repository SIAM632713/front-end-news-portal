import React from 'react';
import {useGetAllArticlesQuery} from "../../../redux/feature/articleAPI/articleAPI.js";
import Loading from "../../Loading/Loading.jsx";
import {Link} from "react-router-dom";

const ResentPost = () => {

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
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Recent posts</h2>
                <Link to="/dashboard/your-articles">
                    <button className="bg-black text-white px-3 py-1 rounded cursor-pointer">See all</button>
                </Link>
            </div>

            <table className="w-full">
            <thead>
                <tr className="text-left text-sm text-gray-500">
                    <th>Post image</th>
                    <th>Post Title</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {newsData.map(post => (
                    <tr key={post.id} className="border-t">
                        <td className="py-2">
                            <img src={post.image} alt="Post" className="w-10 h-10 rounded-full" />
                        </td>
                        <td className="py-2">{post.title}</td>
                        <td className="py-2">{post.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResentPost;
