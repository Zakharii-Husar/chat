import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { RENAME_GROUP_CHAT } from "../../APIEndpoints";
import { rename } from "../slices/currentChatSlice";

const renameGroupThunk = createAsyncThunk(
  "currentChat/renameGroup",
  async (newName: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const chatId = state.currentChat.chatId;
    if (!chatId) return;
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
        // Update local state immediately after successful response
        dispatch(rename(newName));
      }
    } catch (error) {
      console.error("Error renaming group:", error);
      throw error;
    }
  }
);

export default renameGroupThunk;
