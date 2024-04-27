import { createAsyncThunk } from "@reduxjs/toolkit";
import { SEARCH_USERS } from "./APIEndpoints";
import { findUsers } from "../slices/usersSlice";
import { RootState } from "../store";




const searchUsersThunk = createAsyncThunk(
  "users/searchUsers",
  async (searchQuery: string, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const itemsToSkip = state.users.filteredUsers.length;
      const itemsToTake = 5;
      const link = SEARCH_USERS(encodeURIComponent(searchQuery), itemsToSkip, itemsToTake);
      const response = await fetch(link,
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
        dispatch(findUsers(filteredUsers));
      }
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
);

export default searchUsersThunk;