import React from 'react';
import { useGetSingleArticleQuery } from "../../redux/feature/articleAPI/articleAPI.js";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import Advertize from "./advertize.jsx";
import Comment from "./comment.jsx";
import ShowComment from "./showComment.jsx";

const ReadPost = () => {
    const { id } = useParams();
    const { data, error, isLoading,refetch } = useGetSingleArticleQuery(id);

    const newsData = data?.data?.data || {};
    const { category, image, description, title, createdAt } = newsData;

    const userData = data?.data?.reviewData || [];

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load the article.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }


    return (
        <div className="max-w-[1400px] mx-auto p-6 mt-10 bg-white overflow-hidden">
            <div className="mb-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300">
                    {title}
                </h1>
                <span className="inline-block mt-3 px-5 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-full font-medium border border-indigo-200 shadow-sm">
                    {category}
                </span>
            </div>

            {image && (
                <div className="overflow-hidden rounded-xl shadow-lg mb-2">
                    <img
                        src={image}
                        alt="Article"
                        className="w-full h-[500px] object-cover transform hover:scale-105 transition duration-500"
                    />
                </div>
            )}

            {/* Date and Read Time */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6 px-1 border-b pb-2">
                <p>{new Date(createdAt).toLocaleDateString()}</p>
                <p className="italic">15 mins read</p>
            </div>

            <div className="px-2 sm:px-4 space-y-4 text-justify">
                <p className= 'font-semibold text-base'>{description}</p>
            </div>
            <Advertize/>
            <Comment refetch={refetch}/>
            <ShowComment refetch={refetch} userData={userData}/>
        </div>
    );
};

export default ReadPost;
