import { createAsyncThunk } from "@reduxjs/toolkit";
import { RM_LIKE } from "./APIEndpoints";
import { RootState } from "../state/store";

const rmLikeThunk = createAsyncThunk(
  "currentChat/rmLike",
  async (messageId: number , { getState }) => {
    try {
      const state = getState() as RootState;
      const chatId = state.currentChat.chatId;
      if(!chatId) return;
      const link = RM_LIKE(chatId, messageId);
      fetch(link, {
        method: "DELETE",
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

export default rmLikeThunk;