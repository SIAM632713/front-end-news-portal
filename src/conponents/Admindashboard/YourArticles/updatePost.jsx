import React, {useEffect, useState} from 'react';
import {useGetSingleArticleQuery, useUpdateArticleMutation} from "../../../redux/feature/articleAPI/articleAPI.js";
import {useParams} from "react-router-dom";
import axios from "axios";
import {getBaseURL} from "../../../utilitis/utilitis.js";
import ButtonLoader from "../../Userdashboard/Profile/buttonLoader.jsx";

const UpdatePost = () => {

    const {id} = useParams();
    const {data} = useGetSingleArticleQuery(id);
    const articleData = data?.data?.data || {};
    const {title, description, category, image} = articleData || {};
    const [newdata, {isLoading}] = useUpdateArticleMutation();
    const [upload, setUpload] = useState(false);

    const [inputdata, setinputdata] = useState({
        title: "",
        description: "",
        imageFile: "",
        category: ""
    });

    useEffect(() => {
        if (articleData) {
            setinputdata({
                title: title || "",
                description: description || "",
                imageFile: image || null,
                category: category || ""
            });
        }
    }, [articleData]);

    const HandleonChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputdata(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setinputdata(prev => ({ ...prev, [name]: value }));
        }
    };

    const HandleonSubmmit = async (e) => {
        e.preventDefault();
        setUpload(true);

        try {
            let imageUrl = "";

            if (inputdata.imageFile) {
                const formData = new FormData();
                formData.append("image", inputdata.imageFile);

                const imageUploadResponse = await axios.post(`${getBaseURL()}/api/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                imageUrl = imageUploadResponse.data.url;
            }

            const Updatedata = {
                title: inputdata.title,
                description: inputdata.description,
                image: imageUrl,
                category: inputdata.category,
            };

            await newdata({id, newdata: Updatedata}).unwrap();
            alert("product successfully updated");

        } catch (error) {
            console.log(error);
        } finally {
            setUpload(false);
        }
    };

    return (
        <div className="p-4">
            {/* Use flex-wrap and gap for responsiveness */}
            <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
                <input
                    value={inputdata.title}
                    onChange={HandleonChange}
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full mb-3 sm:mb-0 border border-gray-300 rounded px-3 py-2"
                />
                <select
                    value={inputdata.category}
                    onChange={HandleonChange}
                    name="category"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">Select a Category</option>
                    <option value="Tech">Tech</option>
                    <option value="News">News</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            </div>

            <div className="mb-4 border-2 border-dotted border-gray-300 rounded px-3 py-4">
                <input
                    onChange={HandleonChange}
                    name="image"
                    type="file"
                    className="w-full"
                />
            </div>

            <div className="mb-4">
                <textarea
                    value={inputdata.description}
                    onChange={HandleonChange}
                    name="description"
                    placeholder="Write something here..."
                    rows="8"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <button
                onClick={HandleonSubmmit}
                type="submit"
                disabled={isLoading || upload}
                className={`w-full py-2 rounded-md text-white flex justify-center items-center ${
                    isLoading || upload
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {isLoading || upload ? <ButtonLoader text="Saving..."/> : "Publish Your Article"}
            </button>
        </div>
    );
};

export default UpdatePost;
