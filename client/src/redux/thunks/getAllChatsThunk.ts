import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_CHATS } from "./APIEndpoints";
import { appendChats, setHasMore } from "../slices/chatsOverviewSlice";
import { RootState } from "../store";

const getAllChatsThunk = createAsyncThunk(
  "chats/getAllChats",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const itemsToTake = 10;
    const itemsToSkip = state.chats.chats.length;
    const link = GET_ALL_CHATS(itemsToSkip, itemsToTake);
    try {
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
        const data = await response.json();
        dispatch(appendChats(data));
        if(data.length < itemsToTake) dispatch(setHasMore());
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default getAllChatsThunk;