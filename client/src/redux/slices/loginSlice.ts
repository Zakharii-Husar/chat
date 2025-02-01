import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILoginState } from "../../Interfaces";
const initialState: ILoginState = {
        usernameOrEmail: null,
        password: null
};


export const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.usernameOrEmail = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },

});

export const { setLogin, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
