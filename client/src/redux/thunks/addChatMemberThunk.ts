import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CHAT_MEMBER } from "../../APIEndpoints";
import type { RootState } from "../store";
import { IUser } from "../../Interfaces";

const addChatMemberThunk = createAsyncThunk(
  "currentChat/addChatMember",
  async (member: IUser, { getState }) => {
    const state = getState() as RootState;
    const chatId = state.currentChat.chatId;
    const userName = member.userName;
    if(!chatId || !userName) return;
    const link = ADD_CHAT_MEMBER(chatId, userName);
    
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('Failed to add member');
      }
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  }
);

export default addChatMemberThunk;
