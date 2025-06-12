import React, {useState} from 'react';
import {useArticlePostMutation} from "../../../redux/feature/articleAPI/articleAPI.js";
import {useSelector} from "react-redux";
import axios from "axios";
import {getBaseURL} from "../../../utilitis/utilitis.js";
import Loading from "../../Loading/Loading.jsx";

const CreatPost = () => {

    const [data,{isLoading}]=useArticlePostMutation()
    const {user}=useSelector((state)=>state.auth)
    const [upload,setUpload]=useState(false)

    const [inputForm,setInputForm] =useState({
        title:'',
        description:'',
        Image:'',
        category:'',
    });

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputForm((prev) => ({
                ...prev,
                Image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };


    const HandleonChange=(e)=>{
        const {name,value,type,files}=e.target;

        if(type === 'file'){
            handleImageUpload(files[0])
        }else {
            setInputForm({
                ...inputForm,
                [name]:value
            })
        }
    }

    const HandleonSubmit=async (e)=>{
        e.preventDefault()
        setUpload(true)
        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                image: inputForm.Image, // base64 string
            });

            const imageUrl = imageUploadResponse.data;

            const newData = {
                title:inputForm.title,
                description:inputForm.description,
                image:imageUrl,
                category:inputForm.category,
                author:user?._id
            }

            await data(newData).unwrap()
            alert("Article uploaded successfully.")
            setInputForm({
                title:'',
                description:'',
                Image:'',
                category:'',
            })
        }catch(err){
            console.log(err)
        }finally {
            setUpload(false);
        }
    }

    if(isLoading || upload) return (
        <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    )

    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4">
                <input
                    value={inputForm.title}
                    onChange={HandleonChange}
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <select value={inputForm.category}
                        onChange={HandleonChange}
                        name="category"
                        className="border border-gray-300 rounded px-3 py-2">
                    <option>Select a Category</option>
                    <option>Tech</option>
                    <option>News</option>
                    <option>Lifestyle</option>
                </select>
            </div>

            <div className="mb-4 border-2 border-dotted border-gray-300 rounded px-3 py-4">
                <input onChange={HandleonChange} name="image" type="file" className="w-full" />
            </div>

            <div className="mb-4">
                <textarea
                    value={inputForm.description}
                    onChange={HandleonChange}
                    name="description"
                    placeholder="Write something here..."
                    rows="8"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
            </div>

            <button onClick={HandleonSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded cursor-pointer">
                Publish Your Article
            </button>
        </div>
    );
};

export default CreatPost;
