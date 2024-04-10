import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { SEND_MESSAGE } from "./APIEndpoints";


const sendMessageThunk = createAsyncThunk(
    "sendMessage/sendMessageAsync",
    async (_, { getState, dispatch }) => {
      const state = getState() as RootState;
      try {
        const response = await fetch(SEND_MESSAGE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ChatId: state.currentChat.chatId,
            Content: state.sendMessage.Content,
            RepliedTo: state.sendMessage.RepliedTo
          }),
          credentials: "include",
        });
  
        if (response.ok) {
          // const messageResponse = await response.json();
          // dispatch(addMessageToChat(messageResponse));
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  export default sendMessageThunk;