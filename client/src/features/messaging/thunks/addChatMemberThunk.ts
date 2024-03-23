import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CHAT_MEMBER } from "../../../app/APIEndpoints";
import type { RootState } from "../../../app/store";
import { IChatMember } from "../messagesInterfaces";
import { addMessageToChat, addMember } from "../currentChat/currentChatSlice";

const addChatMemberThunk = createAsyncThunk(
  "existingChat/addChatMemberThunk",
  async (member: IChatMember, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(ADD_CHAT_MEMBER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChatId: state.existingChat.chatId,
          UserId: member.memberId,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addMessageToChat(data));
        dispatch(addMember(member));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default addChatMemberThunk;
