import { createAsyncThunk } from "@reduxjs/toolkit";
import { MARK_CHAT_AS_READ } from "./APIEndpoints";

const markChatAsReadThunk = createAsyncThunk(
    "currentChat/markChatAsRead",
    async (chatId: number) => {
      const link = MARK_CHAT_AS_READ(chatId);
  
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (response.ok) return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export default markChatAsReadThunk;