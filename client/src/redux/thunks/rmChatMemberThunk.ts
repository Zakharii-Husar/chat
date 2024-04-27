import { createAsyncThunk } from "@reduxjs/toolkit";
import { REMOVE_CHAT_MEMBER } from "./APIEndpoints";
import type { RootState } from "../store";
import { rmMemberByUname } from "../slices/currentChatSlice";

const rmChatMemberThunk = createAsyncThunk(
  "currentChat/rmChatMember",
  async (memberUname: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const chatId = state.currentChat.chatId;
    if(!memberUname || !chatId) return;
    const link = REMOVE_CHAT_MEMBER(chatId, memberUname);
    try {
      await fetch(link, {
        method: "PATCH",
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

export default rmChatMemberThunk;
