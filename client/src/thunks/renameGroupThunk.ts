import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { RENAME_GROUP_CHAT } from "./APIEndpoints";

const renameGroupThunk = createAsyncThunk(
  "currentChat/renameGroup",
  async (newName: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const chatId = state.currentChat.chatId;
    if (!chatId) return;
    const link = RENAME_GROUP_CHAT(chatId, encodeURI(newName));

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

export default renameGroupThunk;
