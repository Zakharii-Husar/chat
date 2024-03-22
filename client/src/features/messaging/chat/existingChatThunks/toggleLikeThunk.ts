import { createAsyncThunk } from "@reduxjs/toolkit";
import { LIKE_MESSAGE } from "../../../../app/APIEndpoints";
import type { RootState } from "../../../../app/store";
import { likeOrUnlike } from "../existingChatSlice";

const toggleLikeThunk = createAsyncThunk(
  "chat/toggleLikeThunk",
  async (props: { messageId: number; userName: string }, { dispatch }) => {
    try {
      const response = await fetch(LIKE_MESSAGE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.messageId),
        credentials: "include",
      });

      if (response.ok) {
        dispatch(
          likeOrUnlike({
            id: props.messageId,
            name: props.userName,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default toggleLikeThunk;
