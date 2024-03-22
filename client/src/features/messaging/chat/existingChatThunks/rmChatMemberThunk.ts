import { createAsyncThunk } from "@reduxjs/toolkit";
import { REMOVE_CHAT_MEMBER } from "../../../../app/APIEndpoints";
import type { RootState } from "../../../../app/store";
import { addMessageToChat, rmMember } from "../existingChatSlice";

const rmChatMemberThunk = createAsyncThunk(
  "existingChat/rmChatMemberThunk",
  async (memberId: string, { getState, dispatch }) => {
    const state = getState() as RootState;

    try {
      const response = await fetch(REMOVE_CHAT_MEMBER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChatId: state.existingChat.chatId,
          UserId: memberId,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addMessageToChat(data));
        dispatch(rmMember(memberId));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default rmChatMemberThunk;
