import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CHAT_BY_ID } from "../../APIEndpoints";
import type { RootState } from "../store";
import { appendMsgs, setLoading } from "../slices/currentChatSlice";

let abortController = new AbortController();

const getChatByIdThunk = createAsyncThunk(
  "currentChat/getChatById",
  async (chatId: number, { getState, dispatch }) => {
    // Cancel any pending request
    abortController.abort();
    abortController = new AbortController();

    const state = getState() as RootState;
    const itemsToSkip = state.currentChat.messages.length;
    const link = GET_CHAT_BY_ID(chatId, itemsToSkip);
    
    // Set loading state to true when starting the request
    if (itemsToSkip === 0) {
      dispatch(setLoading(true));
    }
    
    try {
      const response = await fetch(link, {
        signal: abortController.signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch(appendMsgs(data));
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Handle abort
        return;
      }
      console.log(error);
    } finally {
      // Set loading state to false when request completes
      if (itemsToSkip === 0) {
        dispatch(setLoading(false));
      }
    }
  }
);

export default getChatByIdThunk;