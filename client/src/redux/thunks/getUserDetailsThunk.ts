import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER } from "../../APIEndpoints";
import { setUserDetails } from "../slices/viewUserSlice";

const getUserDetailsThunk = createAsyncThunk(
    "users/getUserDetails",
    async (userName: string, { dispatch }) => {
        const link = GET_USER(userName);
        try {
            const response = await fetch(link, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setUserDetails(data));
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export default getUserDetailsThunk