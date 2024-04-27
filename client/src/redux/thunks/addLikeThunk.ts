import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_LIKE } from "./APIEndpoints";
import { RootState } from "../store";

const addLikeThunk = createAsyncThunk(
  "currentChat/addLike",
  async (messageId: number , { getState }) => {
    try {
      const state = getState() as RootState;
      const chatId = state.currentChat.chatId;
      if(!chatId) return;
      const link = ADD_LIKE(chatId, messageId);
      fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export default addLikeThunk;
