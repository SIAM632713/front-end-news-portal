import {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";

const userAPI=createApi({
    reducerPath:"userAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/user`,
        credentials:'include'
    }),
    tagTypes:['user'],
    endpoints:(builder)=>({
        getAllusers:builder.query({
            query:()=>({
                url:"/get-alluser",
                method:"GET",
                credentials:'include'
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`/delete-user/${id}`,
                method:"DELETE",
                credentials:'include'
            })
        }),
        updateUser:builder.mutation({
            query:({id,Userdata})=>({
                url:`/update-user/${id}`,
                method:"POST",
                body:Userdata,
                credentials:'include'
            }),
            invalidatesTags: ['user'],
        })
    })
})

export const {useGetAllusersQuery,useDeleteUserMutation,useUpdateUserMutation}=userAPI
export default userAPI