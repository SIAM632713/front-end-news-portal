import React, { useState } from 'react';
import {usePostReviewMutation} from "../../redux/feature/Review/reviewAPI.js";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getToken} from "../../utilitis/sessionHelper.js";

const Comment = ({refetch}) => {

    const {id}=useParams();
    const {user}=useSelector((state)=>state.auth);
    const [postReview]=usePostReviewMutation(id)
    const navigate = useNavigate();

    const [commentImput, setcommentImput] = useState({
        comment: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setcommentImput({
            ...commentImput,
            [name]: value,
        })
    };

    const HandleonSubmmit=async (e)=>{
        e.preventDefault();

        if(!getToken()){
        alert("Please log in")
            navigate("/login")
            return;
        }

        const newComment = {
            comment:commentImput.comment,
            userID:user?._id,
            articleID:id
        }

        try {
            await postReview( newComment).unwrap()
            alert("Successfully posted")
            setcommentImput({
                comment:''
            })
            refetch()
        }catch(err){
           console.log(err);
            alert("Something went wrong")
        }
    }


    return (
        <div className="max-w-[900px] mx-auto mt-10">
            <form onSubmit={HandleonSubmmit}
                className="border border-gray-300 rounded-md p-4 shadow-sm bg-gradient-to-b from-white to-gray-50"
            >
                <textarea
                    value={commentImput.comment}
                    onChange={handleChange}
                    name="comment"
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 resize-none"
                    placeholder="Add a comment..."
                ></textarea>

                <div className="flex justify-end items-center mt-2">
                    <button
                        type="submit"
                        className="px-4 py-1.5 text-white bg-black rounded-md hover:bg-gray-800 transition cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Comment;
