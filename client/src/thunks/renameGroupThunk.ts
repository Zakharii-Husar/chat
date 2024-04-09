import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { RENAME_GROUP_CHAT } from "./APIEndpoints";
import { addMessageToChat, rename } from "../state/currentChatSlice";

const renameGroupThunk = createAsyncThunk(
    "currentChat/renameGroupThunk",
    async (newName: string, { dispatch, getState }) => {
      const state = getState() as RootState;
  
      try {
        const response = await fetch(RENAME_GROUP_CHAT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ChatId: state.currentChat.chatId,
            NewChatName: newName,
          }),
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch(addMessageToChat(data));
          dispatch(rename(newName));
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  export default renameGroupThunk;