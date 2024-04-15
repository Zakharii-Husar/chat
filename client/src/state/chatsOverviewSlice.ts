import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IChatsOverview, IMessage } from "./Interfaces";

const initialState: IChatsOverview = {
  chats: [],
  hasMore: true,
  isLoading: false,
};


export const chatsSlice = createSlice({
  name: "chatsSlice",
  initialState,
  reducers: {
    prependChats: (state,action: PayloadAction<IMessage>) => {
      const existingChats = state.chats;
      const existingChatIndex = existingChats.findIndex(chat=> chat.chatId === action.payload.chatId);
      if(existingChatIndex !== -1) existingChats.splice(existingChatIndex, 1);
      state.chats.unshift(action.payload);
    },
    appendChats: (state, action: PayloadAction<IMessage[]>) => {
      const newMessages = action.payload;
      const existingMessageIds = new Set(state.chats.map(chat => chat.messageId));
  
      const filteredMessages = newMessages.filter(
          message => !existingMessageIds.has(message.messageId)
      );
  
      state.chats = [...state.chats, ...filteredMessages];
    },
    setHasMore: (state)=>{
      state.hasMore = false;
    },
    markChatAsRead: (state, action: PayloadAction<{chatId: number, username: string}>) =>{
      const index = state.chats.findIndex(chat => chat.chatId === action.payload.chatId);
      state.chats[index].seenBy.push(action.payload.username)
    }
  },
});

export const { appendChats, setHasMore, prependChats, markChatAsRead } = chatsSlice.actions;

export default chatsSlice.reducer;
