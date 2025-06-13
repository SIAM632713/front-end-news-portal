import {configureStore} from "@reduxjs/toolkit";
import authAPI from "../auth/authAPI.js"
import authReducer from "../auth/authSlice.jsx"
import articleAPI from "../articleAPI/articleAPI.js";
import userAPI from "../user/userAPI.js";


export const store=configureStore({
    reducer:{
        [authAPI.reducerPath]:authAPI.reducer,
        auth:authReducer,
        [articleAPI.reducerPath]:articleAPI.reducer,
        [userAPI.reducerPath]:userAPI.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authAPI.middleware,articleAPI.middleware,userAPI.middleware)
})