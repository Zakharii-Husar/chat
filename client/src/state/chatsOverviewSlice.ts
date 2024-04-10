import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../features/messaging/messagesInterfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IChatsOverview {
  chats: IMessage[],
  paginationOffset: number,
  hasMore: boolean,
  isLoading: boolean
}

const initialState: IChatsOverview = {
  chats: [],
  paginationOffset: 0,
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
