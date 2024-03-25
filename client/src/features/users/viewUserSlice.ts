import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserDetails } from "./usersInterfaces";

const initialState: IUserDetails = {
    id: null,
    userName: null,
    email: null,
    fullName: null,
    avatarName: null,
    bio: null,
    lastVisit: null
};

export const viewUserSlice = createSlice({
    name: "viewUserSlice",
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<IUserDetails>) => {
            return action.payload;
        }
    },

});

export const { setUserDetails } = viewUserSlice.actions;

export default viewUserSlice.reducer;