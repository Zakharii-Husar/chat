import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_CHATS } from "./APIEndpoints";
import { setCchats, updateChats } from "../state/chatsOverviewSlice";
import { RootState } from "../state/store";

const getAllChatsThunk = createAsyncThunk(
  "chats/getAllChats",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const itemsToTake = 5;
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
        console.log(data);
        if(itemsToSkip === 0){
          dispatch(setCchats(data))
          return;
        }
        dispatch(updateChats(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default getAllChatsThunk;