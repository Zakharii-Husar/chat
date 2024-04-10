import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CHAT_MEMBER } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { IChatMember } from "../features/messaging/messagesInterfaces";
import { addMessageToChat, addMember } from "../state/currentChatSlice";

const addChatMemberThunk = createAsyncThunk(
  "currentChat/addChatMemberThunk",
  async (member: IChatMember, { getState, dispatch }) => {
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

      if (response.ok) {
        const data = await response.json();
        // dispatch(addMessageToChat(data));
        dispatch(addMember(member));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default addChatMemberThunk;
