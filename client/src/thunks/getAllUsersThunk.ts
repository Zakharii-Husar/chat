import { createAsyncThunk} from "@reduxjs/toolkit";
import { GET_ALL_USERS } from "./APIEndpoints";
import { fetchAllUsers } from "../state/usersSlice";
import { RootState } from "../state/store";


export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAllUsersAsync",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const itemsToSkip = state.users.allUsers.length;
    const itemsToTake = 5;
    const link = GET_ALL_USERS(itemsToSkip, itemsToTake);
    try {
      const response = await fetch(link, {
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