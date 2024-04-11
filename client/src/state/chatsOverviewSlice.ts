import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IChatsOverview } from "./Interfaces";

const initialState: IChatsOverview = {
  chats: [],
  hasMore: true,
  isLoading: false,
};


export const chatsSlice = createSlice({
  name: "chatsSlice",
  initialState,
  reducers: {
    setCchats: (state, action: PayloadAction<IChatsOverview>) => {
      return action.payload;
    },
    updateChats: (state, action: PayloadAction<IChatsOverview>) => {
      const newState = { ...state, ...action.payload };

      const uniqueChats = action.payload.chats.filter(
        (newChat) =>
          !state.chats.some(
            (existingChat) =>
              existingChat.chatId === newChat.chatId
          )
      );
      newState.chats = [...state.chats, ...uniqueChats];

      return newState;
    },
  },
});

export const { setCchats, updateChats } = chatsSlice.actions;

export default chatsSlice.reducer;
