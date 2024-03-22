import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../../app/store";
import { addMessageToChat } from "../existingChatSlice";
import { SEND_MESSAGE } from "../../../../app/APIEndpoints";


const sendMessageThunk = createAsyncThunk(
    "newChat/sendMessageAsync",
    async (_, { getState, dispatch }) => {
      const state = getState() as RootState;
      try {
        const response = await fetch(SEND_MESSAGE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...state.newChat.messageToSend,
            ChatId: state.existingChat.chatId,
          }),
          credentials: "include",
        });
  
        if (response.ok) {
          const messageResponse = await response.json();
          dispatch(addMessageToChat(messageResponse));
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  export default sendMessageThunk;