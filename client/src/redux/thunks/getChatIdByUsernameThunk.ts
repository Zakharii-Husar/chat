import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CHAT_ID_BY_USERNAME } from "./APIEndpoints";
import { setCurrentChatId } from "../slices/currentChatSlice";
import { RootState } from "../store";

const getChatIdByUsernameThunk = createAsyncThunk(
  "users/getChatIdByUsername",
  async (userName: string, { getState, dispatch }) => {
    const link = GET_CHAT_ID_BY_USERNAME(userName);
    const state = getState() as RootState;
    try {
      const response = await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const chatId = await response.json();
        if (chatId) {
          dispatch(setCurrentChatId(chatId));
          return chatId;
        }
      }
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
);

export default getChatIdByUsernameThunk;
