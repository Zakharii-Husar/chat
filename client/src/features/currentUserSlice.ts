import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface ICurrentUser{
    id: string | null;
    userName: string | null;
    email: string | null;
    fullName: string | null;
    avatarLink: string | null;
    bio: string | null;

}

const initialState: ICurrentUser = {
    id: null,
    userName: null,
    email: null,
    fullName: null,
    avatarLink: null,
    bio: null
};

export const currentUserSlice = createSlice({
    name: "currentUserSlice",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<ICurrentUser>) => {
            return action.payload;
        }
    },

});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;