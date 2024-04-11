import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { RENAME_GROUP_CHAT } from "./APIEndpoints";
import { addMessageToChat, rename } from "../state/currentChatSlice";

const renameGroupThunk = createAsyncThunk(
    "currentChat/renameGroup",
    async (newName: string, { dispatch, getState }) => {
      const state = getState() as RootState;
      const chatId = state.currentChat.chatId;
      if(!chatId) return;
      const link = RENAME_GROUP_CHAT(chatId, encodeURI(newName));
      
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
          dispatch(rename(newName));
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  export default renameGroupThunk;