import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface ICurrentUser{
    id: string | null;
    userName: string | null;
    email: string | null;
    fullName: string | null;
    avatarName: string | null;
    bio: string | null;
    lastVisit: Date | null;
}

const initialState: ICurrentUser = {
    id: null,
    userName: null,
    email: null,
    fullName: null,
    avatarName: null,
    bio: null,
    lastVisit: null
};

export const currentUserSlice = createSlice({
    name: "currentUserSlice",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<ICurrentUser>) => {
            return action.payload;
        },
        updateAvatarName: (state, action: PayloadAction<string | null>)=> {
            state.avatarName = action.payload;
        }
    },

});

export const { setCurrentUser, updateAvatarName } = currentUserSlice.actions;

export default currentUserSlice.reducer;