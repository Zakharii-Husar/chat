import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CHAT_BY_ID } from "../../../app/APIEndpoints";
import type { RootState } from "../../../app/store";
import { setLoading, setChat } from "./currentChatSlice";

const getChatByIdThunk = createAsyncThunk(
  "currentChat/getChatByIdThunk",
  async (chatId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${GET_CHAT_BY_ID}?chatId=${chatId}&paginationOffset=${state.currentChat.paginationOffset}`,
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