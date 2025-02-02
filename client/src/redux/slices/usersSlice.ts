import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUsers } from "../../Interfaces";

const initialState: IUsers = {
  allUsers: [],
  filteredUsers: [],
  searchedUser: null,
  hasMore: true,
  isLoading: false
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    updateSearchedUser: (state, action: PayloadAction<string | null>) => {
      state.searchedUser = action.payload;
      state.filteredUsers = [];
      state.hasMore = true;
    },
    fetchAllUsers: (state, action: PayloadAction<IUser[]>) => {
      const existingIds = new Set(state.allUsers.map(user => user.id));
      
      const newUsers = action.payload.filter(user => !existingIds.has(user.id));
      
      state.allUsers = [...state.allUsers, ...newUsers];
      if (action.payload.length < 5) {
        state.hasMore = false;
      }
    },
    findUsers: (state, action: PayloadAction<IUser[]>) => {
      const existingIds = new Set(state.filteredUsers.map(user => user.id));
      
      const newUsers = action.payload.filter(user => !existingIds.has(user.id));
      
      state.filteredUsers = [...state.filteredUsers, ...newUsers];
      if (action.payload.length < 5) {
        state.hasMore = false;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { fetchAllUsers, updateSearchedUser, findUsers, setLoading } =
  usersSlice.actions;

export default usersSlice.reducer;
