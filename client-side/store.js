import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../client-side/src/slices/authslice'; // Ensure this path is correct
import { apiSlice } from "../client-side/src/slices/apislice"; // Ensure this path is correct

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
