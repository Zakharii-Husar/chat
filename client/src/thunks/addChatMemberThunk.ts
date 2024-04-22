import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CHAT_MEMBER } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { IUser } from "../state/Interfaces";
import { addMember } from "../state/currentChatSlice";

const addChatMemberThunk = createAsyncThunk(
  "currentChat/addChatMember",
  async (member: IUser, { getState, dispatch }) => {
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
        dispatch(addMember(member));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default addChatMemberThunk;
