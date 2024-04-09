import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CHAT_MEMBER } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { IChatMember } from "../features/messaging/messagesInterfaces";
import { addMessageToChat, addMember } from "../state/currentChatSlice";

const addChatMemberThunk = createAsyncThunk(
  "currentChat/addChatMemberThunk",
  async (member: IChatMember, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(ADD_CHAT_MEMBER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChatId: state.currentChat.chatId,
          UserId: member.memberId,
        }),
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
