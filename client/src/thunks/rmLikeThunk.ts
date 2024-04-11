import { createAsyncThunk } from "@reduxjs/toolkit";
import { RM_LIKE } from "./APIEndpoints";
import { rmLike } from "../state/currentChatSlice";
import { RootState } from "../state/store";

const rmLikeThunk = createAsyncThunk(
  "currentChat/rmLikeThunk",
  async (messageId: number , { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const chatId = state.currentChat.chatId;
      if(!chatId) return;
      const link = RM_LIKE(chatId, messageId);
      const response = await fetch(link, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        dispatch(
          rmLike({
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

export default rmLikeThunk;