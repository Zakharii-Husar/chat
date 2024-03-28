import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHECK_COOKIES_URL } from "../../../app/APIEndpoints";
import { setLoggedInUser } from "../loggedInUserSlice";

const validateCookiesThunk = createAsyncThunk(
    "login/validateCookies",
    async (_, { dispatch }) => {
        try {
            const response = await fetch(CHECK_COOKIES_URL, {
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