import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { LOGIN_URL } from "../../APIEndpoints";
import { setLoggedInUser } from "../slices/loggedInUserSlice";


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
                const data = await response.json();
                if(data)
                    {
                        dispatch(setLoggedInUser(data));
                        return true;
                    }else
                    {
                        return false;
                    }
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export default loginWithPasswordThunk;