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
            query:({id,...body})=>({
                url:`/update-user/${id}`,
                method:"POST",
                body,
                credentials:'include'
            }),
            invalidatesTags: ['user'],
        }),
        getSingleUser:builder.query({
            query:(id)=>({
                url:`/get-singleuser/${id}`,
                method:"GET",
                credentials:'include'
            })
        }),
        updateUserRole:builder.mutation({
            query:({id,role})=>({
                url:`/update-user-role/${id}`,
                method:"POST",
                body: {role},
            })
        })
    })
})

export const {useGetAllusersQuery,useDeleteUserMutation,useUpdateUserMutation,useGetSingleUserQuery,useUpdateUserRoleMutation}=userAPI
export default userAPI