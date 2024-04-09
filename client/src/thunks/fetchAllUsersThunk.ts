import { createAsyncThunk} from "@reduxjs/toolkit";
import { GET_ALL_USERS } from "./APIEndpoints";
import { fetchAllUsers } from "../state/usersSlice";


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