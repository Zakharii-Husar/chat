import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserModel, IUsersModel } from "../features/users/userInterfaces";

const initialState: IUsersModel = {
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
    fetchAllUsers: (state, action: PayloadAction<IUserModel[]>) => {
      state.allUsers = action.payload;
    },
    findUsers: (state, action: PayloadAction<IUserModel[]>) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { fetchAllUsers, updateSearchedUser, findUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
