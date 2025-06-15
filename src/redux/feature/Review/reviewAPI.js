import {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";


const reviewAPI=createApi({
    reducerPath:"reviewAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/review`,
        credentials:'include'
    }),
    tagTypes:['review'],
    endpoints:(builder)=>({
        getAllReviews:builder.query({
            query:(id)=>({
                url:`/get-review/${id}`,
                method:"GET",
                credentials:'include'
            })
        })
    })
})

export const {useGetAllReviewsQuery}=reviewAPI;
export default reviewAPI;