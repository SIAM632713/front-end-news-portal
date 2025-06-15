import React, {useState} from 'react';
import {useGetArticleFilterQuery} from "../../redux/feature/articleAPI/articleAPI.js";
import Loading from "../Loading/Loading.jsx";
import FilterArticle from "./filterArticle.jsx";
import {Link} from "react-router-dom";

const NewsArticles = () => {

    const [filterState, setFilterState] =useState({
        category:'all'
    });

    const {category}=filterState

    const { data: productdata, error, isLoading } = useGetArticleFilterQuery({
        category:category !=="all" ? category : ''
    });

    const totalData=productdata?.data?.articleData

    const [visibleProduct, setVisibleProduct] = useState(8);

    const handleClick = () => {
        setVisibleProduct(prev => prev + 4);
    };

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
        <div className="flex min-h-screen">
            {/* Left Filter Section */}
            <FilterArticle filterState={filterState} setFilterState={setFilterState}/>

            {/* Right Articles Section */}
            <div className="flex-1 p-8 bg-white">
                <h2 className="text-xl font-semibold mb-6">News Articles:</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        totalData.slice(0,visibleProduct).map((item, index) => (
                            <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-[200px] object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-md font-medium mb-1 truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3 capitalize">{item.category}</p>
                                    <Link to={`/read-post/${item?._id}`}>
                                        <button
                                            className="w-full border border-gray-300 text-gray-700 font-medium py-1 rounded-md border border-gray-300 text-black hover:bg-blue-600 hover:text-white cursor-pointer">
                                            Read Article
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {visibleProduct < totalData.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleClick}
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsArticles;
