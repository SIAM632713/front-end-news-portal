import React from 'react';
import Loading from "../../Loading/Loading.jsx";
import {useDeleteUserMutation, useGetAllusersQuery} from "../../../redux/feature/user/userAPI.js";
import {confirmDelete, showSuccess} from "../../../utilitis/sweetalertHelper.js";

const AllUser = () => {

    const {data,error,isLoading,refetch}=useGetAllusersQuery()
    const userData=data?.data || {}

    const [userDelete]=useDeleteUserMutation()

    const HandleDeleteuser=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await userDelete(id).unwrap()
                await showSuccess("Successfully deleted User")
                refetch()
            }catch(error){
                console.log(error)
            }
        }
    }

    if(isLoading ) return (
        <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    )


    return (
        <div className="p-4">
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="text-left border-b">
                    <th className="py-2">Joined On</th>
                    <th className="py-2">User image</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Admin</th>
                    <th className="py-2">Delete</th>
                </tr>
                </thead>
                <tbody>
                {userData.map((item, index) => (
                    <tr key={index} className="border-b">
                        <td className="py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="py-2">
                            {/* Empty image placeholder */}
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        </td>
                        <td className="py-2">{item.username}</td>
                        <td className="py-2">{item.email}</td>
                        <td className="py-2">
                            {item.role === "admin" ? (
                                <span className="text-green-600 font-bold">&#10003;</span>
                            ) : (
                                <span className="text-red-600 font-bold">&#10007;</span>
                            )}
                        </td>
                        <td onClick={()=>HandleDeleteuser(item?._id)} className="py-2 text-red-600 cursor-pointer hover:underline">Delete</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="text-center mt-4 text-gray-500 text-sm">
                A list of your recent subscribers.
            </p>
        </div>
    );
};

export default AllUser;
