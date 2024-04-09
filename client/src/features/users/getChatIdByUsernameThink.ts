import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_CHAT_BY_USERNAME} from "../../app/APIEndpoints";
import { setCurrentChatId } from "../messaging/currentChat/currentChatSlice";

export const getChatIdByUsername = createAsyncThunk(
    "users/getChatIdByUsername",
    async (userName: string, { getState, dispatch }) => {
      try {
        const response = await fetch(
          `${GET_CHAT_BY_USERNAME}/${encodeURIComponent(userName)}`,
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