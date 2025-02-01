import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IChatsOverview, IMessage, IUser } from "../../Interfaces";

const initialState: IChatsOverview = {
  chats: [],
  hasMore: true,
  isLoading: false,
};


export const chatsSlice = createSlice({
  name: "chatsSlice",
  initialState,
  reducers: {
    prependChat: (state,action: PayloadAction<IMessage>) => {
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
    updateChat: (state, action: PayloadAction<IMessage>) => {
      const index = state.chats.findIndex(m=>m.messageId === action.payload.messageId);
      if(index === -1) return;
      state.chats[index] = action.payload;
    },
    setHasMore: (state)=>{
      state.hasMore = false;
    },
    markChatAsRead: (state, action: PayloadAction<{chatId: number, user: IUser}>) =>{
      const index = state?.chats.findIndex(chat => chat?.chatId === action?.payload?.chatId);
      const chatExists = index !== -1;
      const isSender = state?.chats[index]?.senderId === action?.payload?.user?.id;
      const alreadyRead = state?.chats[index]?.seenBy?.some(u=>u.id === action?.payload?.user?.id);
      if(!chatExists || isSender || alreadyRead) return;
      state.chats[index].seenBy.push(action.payload.user);
    }
  },
});

export const { appendChats, setHasMore, prependChat, markChatAsRead, updateChat } = chatsSlice.actions;

export default chatsSlice.reducer;
