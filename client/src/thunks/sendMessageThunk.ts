import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { SEND_MESSAGE } from "./APIEndpoints";

const sendMessageThunk = createAsyncThunk(
  "sendMessage/sendMessageAsync",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const chatId = state.currentChat.chatId;
    if (!chatId) return;
    const link = SEND_MESSAGE(chatId);
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Content: state.sendMessage.Content,
          RepliedTo: state.sendMessage.RepliedTo,
        }),
        credentials: "include",
      });

      if (response.ok) return true;
    } catch (error) {
      console.log(error);
    }
  }
);

export default sendMessageThunk;
