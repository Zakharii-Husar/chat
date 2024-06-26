import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUsers } from "./Interfaces";

const initialState: IUsers = {
  allUsers: [],
  filteredUsers: [],
  searchedUser: null,
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    updateSearchedUser: (state, action: PayloadAction<string | null>) => {
      state.searchedUser = action.payload;
    },
    fetchAllUsers: (state, action: PayloadAction<IUser[]>) => {
      state.allUsers = action.payload;
    },
    findUsers: (state, action: PayloadAction<IUser[]>) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { fetchAllUsers, updateSearchedUser, findUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
