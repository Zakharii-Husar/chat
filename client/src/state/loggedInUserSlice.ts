import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserDetails } from "../features/users/usersInterfaces";

const initialState: IUserDetails = {
    id: null,
    userName: null,
    email: null,
    fullName: null,
    avatarName: null,
    bio: null,
    lastVisit: null
};

export const loggedInUserSlice = createSlice({
    name: "loggedInUserSlice",
    initialState,
    reducers: {
        setLoggedInUser: (state, action: PayloadAction<IUserDetails>) => {
            return action.payload;
        },
        updateAvatarName: (state, action: PayloadAction<string | null>)=> {
            state.avatarName = action.payload;
        }
    },

});

export const { setLoggedInUser, updateAvatarName } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;