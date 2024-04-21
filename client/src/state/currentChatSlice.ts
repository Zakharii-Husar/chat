import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentChat, IMessage, IUser } from "./Interfaces";

const initialState: ICurrentChat = {
  chatId: null,
  adminId: null,
  chatName: null,
  members: [],
  messages: [],
  hasMoreMessages: true,
  isLoading: false,
};

export const existingChatSlice = createSlice({
  name: "existingChatSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentChatId: (state, action: PayloadAction<number | null>) => {
      state.chatId = action.payload;
    },
    setChat: (state, action: PayloadAction<ICurrentChat>) => {
      const newState = { ...state, ...action.payload };

      const newMessages = action.payload.messages.reverse();
      const existingMessageIds = new Set(
        state.messages.map((chat) => chat.messageId)
      );

      const filteredMessages = newMessages.filter(
        (message) => !existingMessageIds.has(message.messageId)
      );

      newState.messages = [...filteredMessages, ...state.messages];

      return newState;
    },

    resetChat: () => initialState,

    addMessageToChat: (state, action: PayloadAction<IMessage>) => {
      if (
        state.messages.some((obj) => obj.messageId === action.payload.messageId)
      )
        return;
      state.messages.push(action.payload);
    },
    addMember: (state, action: PayloadAction<IUser>) => {
      state.members.push(action.payload);
    },
    rmMemberByUname: (state, action: PayloadAction<string>) => {
      const msgIndex = state.members.findIndex(
        (member) => member.userName === action.payload
      );
      if (msgIndex !== -1) state.members.splice(msgIndex, 1);
    },
    rename: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
    },
    addLike: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const msgIndex = state.messages.findIndex(
        (msg) => msg.messageId === action.payload.id
      );
      const likes = state.messages[msgIndex].likes;
      state.messages[msgIndex].likes = likes.filter(
        (name) => name !== action.payload.name
      );
    },
    rmLike: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const msgIndex = state.messages.findIndex(
        (msg) => msg.messageId === action.payload.id
      );
      const likes = state.messages[msgIndex].likes;
      likes.push(action.payload.name);
    },
    markMessagesAsRead: (state, action: PayloadAction<string>) => {
      state.messages.map((msg) => {
        msg.seenBy.push(action.payload);
      });
    },
  }
});

export const {
  setLoading,
  setChat,
  resetChat,
  addMessageToChat,
  setCurrentChatId,
  addMember,
  rmMemberByUname,
  rename,
  addLike,
  rmLike,
  markMessagesAsRead,
} = existingChatSlice.actions;

export default existingChatSlice.reducer;
