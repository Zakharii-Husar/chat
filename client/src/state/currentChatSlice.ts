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
    appendMsgs: (state, action: PayloadAction<ICurrentChat>) => {
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

    prependMsg: (state, action: PayloadAction<IMessage>) => {
      if (
        state.messages.some((obj) => obj.messageId === action.payload.messageId)
      )
        return;
      state.messages.push(action.payload);
    },

    updateMsg: (state, action: PayloadAction<IMessage>) => {
      const index = state.messages.findIndex(m=>m.messageId === action.payload.messageId);
      if(index === -1) return;
      state.messages[index] = action.payload;
    },
    resetChat: () => initialState,

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

    markMessagesAsRead: (state, action: PayloadAction<IUser>) => {
      state.messages.forEach((msg) => {
        const userExists = msg.seenBy.some((user) => user.id === action.payload.id);
        if (!userExists && msg.senderId !== action.payload.id) {
          msg.seenBy.push(action.payload);
        }
      });
    },
  }
});

export const {
  setLoading,
  appendMsgs,
  resetChat,
  prependMsg,
  updateMsg,
  setCurrentChatId,
  addMember,
  rmMemberByUname,
  rename,
  markMessagesAsRead,
} = existingChatSlice.actions;

export default existingChatSlice.reducer;
