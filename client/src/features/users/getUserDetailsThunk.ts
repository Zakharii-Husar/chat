import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER_DETAILS } from "../../app/APIEndpoints";
import { setUserDetails } from "./viewUserSlice";

const getUserDetailsThunk = createAsyncThunk(
    "login/validateCookies",
    async (userName: string, { dispatch }) => {
        try {
            const response = await fetch(`${GET_USER_DETAILS}?userName=${userName}`, {
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