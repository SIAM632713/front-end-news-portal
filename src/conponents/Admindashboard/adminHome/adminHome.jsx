import React from 'react';
import AllUserchart from "./allUserchart.jsx";
import TotalComentchart from "./totalComentchart.jsx";
import TotalPostchart from "./totalPostchart.jsx";
import {useAdminStateQuery} from "../../../redux/feature/state/stateAPI.js";


const AdminHome = () => {

    const {data,error,isLoading}=useAdminStateQuery()

    const {totalPostallTime,totalReviews,totalUser}=data || []

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-3">
         <AllUserchart totalPostallTime={totalPostallTime}/>
            <TotalComentchart/>
            <TotalPostchart/>
        </div>
    );
};

export default AdminHome;
