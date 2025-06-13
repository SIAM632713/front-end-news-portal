import React from 'react';
import Loading from "../../Loading/Loading.jsx";
import {useDeleteUserMutation, useGetAllusersQuery} from "../../../redux/feature/user/userAPI.js";
import {confirmDelete, showSuccess} from "../../../utilitis/sweetalertHelper.js";

const AllUser = () => {

    const {data, error, isLoading, refetch} = useGetAllusersQuery();
    const userData = data?.data || {};

    const [userDelete] = useDeleteUserMutation();

    const HandleDeleteuser = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                await userDelete(id).unwrap();
                await showSuccess("Successfully deleted User");
                refetch();
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    );

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
        <div className="p-4">
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px] table-auto border-collapse text-sm">
                    <thead>
                    <tr className="text-left border-b bg-gray-100">
                        <th className="py-2 px-3">Joined On</th>
                        <th className="py-2 px-3">User image</th>
                        <th className="py-2 px-3">Username</th>
                        <th className="py-2 px-3">Email</th>
                        <th className="py-2 px-3">Admin</th>
                        <th className="py-2 px-3">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"/>
                            </td>
                            <td className="py-2 px-3 break-words">{item.username}</td>
                            <td className="py-2 px-3 break-words">{item.email}</td>
                            <td className="py-2 px-3 text-center">
                                {item.role === "admin" ? (
                                    <span className="text-green-600 font-bold">&#10003;</span>
                                ) : (
                                    <span className="text-red-600 font-bold">&#10007;</span>
                                )}
                            </td>
                            <td
                                onClick={() => HandleDeleteuser(item?._id)}
                                className="py-2 px-3 text-red-600 cursor-pointer hover:underline text-center"
                            >
                                Delete
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <p className="text-center mt-4 text-gray-500 text-sm">
                A list of your recent subscribers.
            </p>
        </div>
    );
};

export default AllUser;
