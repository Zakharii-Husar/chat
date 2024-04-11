import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_LIKE } from "./APIEndpoints";
import { addLike } from "../state/currentChatSlice";
import { RootState } from "../state/store";

const addLikeThunk = createAsyncThunk(
  "currentChat/addLike",
  async (messageId: number , { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const chatId = state.currentChat.chatId;
      if(!chatId) return;
      const link = ADD_LIKE(chatId, messageId);
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        dispatch(
          addLike({
            id: messageId,
            name: state.loggedInUser.userName!,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default addLikeThunk;
