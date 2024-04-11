import { createAsyncThunk } from "@reduxjs/toolkit";
import { REMOVE_CHAT_MEMBER } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { addMessageToChat, rmMemberByUname } from "../state/currentChatSlice";

const rmChatMemberThunk = createAsyncThunk(
  "currentChat/rmChatMember",
  async (memberUname: string, { getState, dispatch }) => {
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

      if (response.ok) {
        const data = await response.json();
        dispatch(addMessageToChat(data));
        dispatch(rmMemberByUname(memberUname));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default rmChatMemberThunk;
