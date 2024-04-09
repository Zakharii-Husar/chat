import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CHAT_BY_ID } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { setLoading, setChat } from "../state/currentChatSlice";

const getChatByIdThunk = createAsyncThunk(
  "currentChat/getChatByIdThunk",
  async (chatId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${GET_CHAT_BY_ID}/${chatId}?itemsToSkip=${state.currentChat.paginationOffset}&itemsToTake=5`,
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
        dispatch(setChat(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default getChatByIdThunk;