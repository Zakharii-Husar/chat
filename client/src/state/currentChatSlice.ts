import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentChat, IMessage, IChatMember } from "../features/messaging/messagesInterfaces";

const initialState: ICurrentChat = {
  chatId: null,
  chatName: null,
  members: [],
  messages: [],
  paginationOffset: 0,
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

      const uniqueMessages = action.payload.messages.filter(
        (newMessage) =>
          !state.messages.some(
            (existingMessage) =>
              existingMessage.messageId === newMessage.messageId
          )
      );

      newState.messages = [...uniqueMessages, ...state.messages];

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
    addMember: (state, action: PayloadAction<IChatMember>) => {
      state.members.push(action.payload);
    },
    rmMember: (state, action: PayloadAction<string>) => {
      const index = state.members.findIndex(
        (member) => member.memberId === action.payload
      );
      if (index !== -1) state.members.splice(index, 1);
    },
    rename: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
    },

    likeOrUnlike: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const index = state.messages.findIndex(
        (msg) => msg.messageId === action.payload.id
      );
      const likes = state.messages[index].likes;

      if (likes.includes(action.payload.name)) {
        state.messages[index].likes = likes.filter(
          (name) => name !== action.payload.name
        );
      } else {
        likes.push(action.payload.name);
      }
    },
  },
});

export const {
  setLoading,
  setChat,
  resetChat,
  addMessageToChat,
  setCurrentChatId,
  addMember,
  rmMember,
  rename,
  likeOrUnlike,
} = existingChatSlice.actions;

export default existingChatSlice.reducer;
