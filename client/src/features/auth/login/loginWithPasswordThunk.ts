import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { LOGIN_URL } from "../../../app/APIEndpoints";
import validateCookiesThunk from "./validateCookiesThunk";


export const loginWithPasswordThunk = createAsyncThunk(
    "login/loginWithPassword",
    async (_, { getState, dispatch }) => {

        const state = getState() as RootState;
        try {
            const response = await fetch(LOGIN_URL, {
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