import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from "../../../app/store";
import { REGISTER_URL } from '../../../app/APIEndpoints';
import validateCookiesThunk from '../login/validateCookiesThunk';

const registerWithPasswordThunk = createAsyncThunk(
    "register/registerWithPassword",
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserName: state.register.nickName,
                    Email: state?.register?.email?.toLowerCase(),
                    FullName: state.register.fullName,
                    Password: state.register.password
                }),
                credentials: "include"
            });

            if (response.ok) {
                dispatch(validateCookiesThunk());
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export default registerWithPasswordThunk;