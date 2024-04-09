import { createAsyncThunk } from "@reduxjs/toolkit";
import { SEARCH_USERS } from "./APIEndpoints";
import { findUsers } from "../state/usersSlice";




export const searchUsers = createAsyncThunk(
  "users/findUsers",
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
        dispatch(findUsers(filteredUsers));
      }
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
);