import React, { useState } from 'react';
import {usePostReviewMutation} from "../../redux/feature/Review/reviewAPI.js";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getToken} from "../../utilitis/sessionHelper.js";

const Comment = () => {
    // const maxChars = 200;

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

        try {
            const newComment = {
                comment:commentImput.comment,
                userID:user?._id,
                articleID:id
            }
            await postReview( newComment).unwrap()
            alert("Successfully posted")
            setcommentImput({
                comment:''
            })
        }catch(err){
           console.log(err);
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

                <div className="flex justify-between items-center mt-2">
                    {/*<span className="text-sm text-gray-500">*/}
                    {/*    {maxChars - comment.length} characters remaining*/}
                    {/*</span>*/}
                    <button
                        type="submit"
                        className="px-4 py-1.5 text-white bg-black rounded-md hover:bg-gray-800 transition cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Below the input */}
            <p className="mt-4 text-sm text-gray-600 italic">No comments yet!</p>
        </div>
    );
};

export default Comment;
