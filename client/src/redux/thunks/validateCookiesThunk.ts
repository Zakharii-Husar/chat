import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHECK_COOKIES_URL } from "./APIEndpoints";
import { setLoggedInUser } from "../slices/loggedInUserSlice";

const validateCookiesThunk = createAsyncThunk(
    "login/validateCookies",
    async (_, { dispatch }) => {
        const link = CHECK_COOKIES_URL();
        try {
            const response = await fetch(link, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setLoggedInUser(data));
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export default validateCookiesThunk