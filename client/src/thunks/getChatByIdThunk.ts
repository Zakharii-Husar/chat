import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CHAT_BY_ID } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { appendMsgs } from "../state/currentChatSlice";

const getChatByIdThunk = createAsyncThunk(
  "currentChat/getChatById",
  async (chatId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const itemsToSkip = state.currentChat.messages.length;
    const link = GET_CHAT_BY_ID(chatId, itemsToSkip)
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
        dispatch(appendMsgs(data));
      }
    } catch (error) {
      console.log(error);
    } 
  }
);

export default getChatByIdThunk;