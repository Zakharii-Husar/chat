import { createAsyncThunk } from "@reduxjs/toolkit";
import { REMOVE_CHAT_MEMBER } from "../../APIEndpoints";
import type { RootState } from "../store";

const rmChatMemberThunk = createAsyncThunk(
  "currentChat/rmChatMember",
  async (memberUname: string, { getState }) => {
    const state = getState() as RootState;
    const chatId = state.currentChat.chatId;
    if(!memberUname || !chatId) return;
    const link = REMOVE_CHAT_MEMBER(chatId, memberUname);
    try {
      const response = await fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error removing chat member:", error);
      throw error;
    }
  }
);

export default rmChatMemberThunk;
