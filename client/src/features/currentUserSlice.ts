import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { LOGIN_URL, CHECK_COOKIES_URL } from "../app/APIEndpoints";


const initialState = {
        id: null,
        nickname: null,
        email: null,
        fullName: null
};

export const validateCookiesAsync = createAsyncThunk(
    "auth/cookies",
    async (_, { dispatch }) => {
        try {
            const response = await fetch(CHECK_COOKIES_URL, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setResponse(data));
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export const loginAsync = createAsyncThunk(
    "auth/login",
    async (_, { getState, dispatch }) => {

        const state = getState() as RootState;
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserNameOrEmail: state.auth.request.usernameOrEmail,
                    Password: state.auth.request.password,
                }),
                credentials: "include",
            });

            if (response.ok) {
                dispatch(validateCookiesAsync());
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setResponse: (state, action: PayloadAction<IResponse>) => {
            state.response = action.payload;
        }
    },

});

export const { setLogin, setPassword, setResponse } = authSlice.actions;

export default authSlice.reducer;