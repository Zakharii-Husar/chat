import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CHAT_ID_BY_USERNAME} from "./APIEndpoints";
import { setCurrentChatId } from "../state/currentChatSlice";

export const getChatIdByUsername = createAsyncThunk(
    "users/getChatIdByUsername",
    async (userName: string, { dispatch }) => {
      const link = GET_CHAT_ID_BY_USERNAME(userName);
      try {
        const response = await fetch(link,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const chatId = await response.json();
          dispatch(setCurrentChatId(chatId));
          return chatId;
        }
      } catch (error) {
        console.error("Error searching users:", error);
        throw error;
      }
    }
  );