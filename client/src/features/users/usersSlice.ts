import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GET_ALL_USERS, SEARCH_USERS } from "../../app/APIEndpoints";
import { IUserModel, IUsersModel } from "../../app/userInterfaces";

const initialState: IUsersModel = {
  allUsers: [],
  filteredUsers: [],
  searchedUser: null,
};

export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAllUsersAsync",
  async (_, { getState, dispatch }) => {
    try {
      const response = await fetch(GET_ALL_USERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const usersList = await response.json();
        dispatch(fetchAllUsers(usersList));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "users/findUser",
  async (searchQuery: string, { getState, dispatch }) => {
    try {
      const response = await fetch(
        `${SEARCH_USERS}/${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const filteredUsers = await response.json();
        dispatch(findUser(filteredUsers));
        console.log(filteredUsers);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
);

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
    findUser: (state, action: PayloadAction<IUserModel[]>) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { fetchAllUsers, updateSearchedUser, findUser } =
  usersSlice.actions;

export default usersSlice.reducer;
