import { createAsyncThunk } from "@reduxjs/toolkit";
import { MARK_MSG_AS_DELETED } from "./APIEndpoints";
import { RootState } from "../store";

const markMsgAsDeletedThunk = createAsyncThunk(
  "currentChat/markMsgAsDeleted",
  async (messageId: number, { getState }) => {
    try {
      const state = getState() as RootState;
      const chatId = state.currentChat.chatId;
      if (!chatId) return;
      const link = MARK_MSG_AS_DELETED(chatId, messageId);
      const response = await fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) return true;
    } catch (error) {
      console.log(error);
    }
  }
);

export default markMsgAsDeletedThunk;
