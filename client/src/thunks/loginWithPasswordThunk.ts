import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { LOGIN_URL } from "./APIEndpoints";
import validateCookiesThunk from "./validateCookiesThunk";


const loginWithPasswordThunk = createAsyncThunk(
    "login/loginWithPassword",
    async (_, { getState, dispatch }) => {

        const state = getState() as RootState;
        const link = LOGIN_URL();
        try {
            const response = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserNameOrEmail: state.login.usernameOrEmail,
                    Password: state.login.password,
                }),
                credentials: "include",
            });

            if (response.ok) {
                dispatch(validateCookiesThunk());
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export default loginWithPasswordThunk;