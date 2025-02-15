import { createAsyncThunk} from "@reduxjs/toolkit";
import { GET_ALL_USERS } from "../../APIEndpoints";
import { fetchAllUsers } from "../slices/usersSlice";
import { RootState } from "../store";


const getAllUsersThunk = createAsyncThunk(
  "users/getAllUsers",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const itemsToSkip = state.users.allUsers.length ?? 0;
    const itemsToTake = 20;
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

export default getAllUsersThunk;