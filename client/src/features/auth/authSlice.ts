import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { LOGIN_URL, CHECK_COOKIES_URL } from "../../app/globalVars";
import { useAppDispatch } from "../../hooks/useAppSelectorAndDispatch";

interface IRequest {
    usernameOrEmail: string | null;
    password: string | null;
}

interface IResponse {
    id: string | null;
    nickname: string | null;
    email: string | null,
    fullName: string | null
}

export interface IAuthState {
    loggedIn: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'rejected';
    error: string | null;
    request: IRequest;
    response: IResponse;
}

const initialState: IAuthState = {
    loggedIn: false,
    loading: 'idle',
    error: null,
    request: {
        usernameOrEmail: null,
        password: null,
    },
    response: {
        id: null,
        nickname: null,
        email: null,
        fullName: null
    },
};

export const validateCookiesAsync = createAsyncThunk(
    "auth/cookies",
    async (_, { getState, dispatch }) => {
        try {
            const response = await fetch(CHECK_COOKIES_URL, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setResponse(data));
                return data;
            }

        } catch (error) {
            return false;
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
                const data = await response.json();
                //dispatch(setResponse(data));
                return data;
            }

        } catch (error) {
            return false;
        }
    }
);

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.request.usernameOrEmail = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.request.password = action.payload;
        },
        setResponse: (state, action: PayloadAction<IResponse>) => {
            state.response = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder

            //LOGIN WITH PASSWORD
            .addCase(loginAsync.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<IResponse>) => {

                if (action.payload) {
                    state.response = action.payload;
                    state.loading = 'succeeded';
                    state.loggedIn = true;
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })

            //CHECK FOR COOKIES
            .addCase(validateCookiesAsync.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(validateCookiesAsync.fulfilled, (state, action: PayloadAction<IResponse>) => {

                if (action.payload) {
                    state.response = action.payload;
                    state.loading = 'succeeded';
                    state.loggedIn = true;
                }
            })
            .addCase(validateCookiesAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
                console.log("rejected")
            })
    },
});

export const { setLogin, setPassword, setResponse } = authSlice.actions;

export default authSlice.reducer;
