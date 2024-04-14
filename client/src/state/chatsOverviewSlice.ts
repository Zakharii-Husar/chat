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
      if(existingChats.some(chat=> chat.messageId === action.payload.messageId)) return;
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
    }
  },
});

export const { appendChats, setHasMore, prependChats } = chatsSlice.actions;

export default chatsSlice.reducer;
