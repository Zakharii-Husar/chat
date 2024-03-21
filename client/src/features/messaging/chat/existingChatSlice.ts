import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  GET_CHAT_BY_ID,
  LIKE_MESSAGE,
  REMOVE_CHAT_MEMBER,
  ADD_CHAT_MEMBER,
  RENAME_GROUP_CHAT,
} from "../../../app/APIEndpoints";
import type { RootState } from "../../../app/store";
import { IExistingChat, IMessage } from "../messagesInterfaces";
import { IChatMember } from "../../../features/messaging/messagesInterfaces";

const initialState: IExistingChat = {
  chatId: null,
  chatName: null,
  members: [],
  messages: [],
  paginationOffset: 0,
  hasMoreMessages: true,
  isLoading: false
};

export const getChatById = createAsyncThunk(
  "existingChat/getChatById",
  async (chatId: number, { getState, dispatch }) => {
    const state = getState() as  RootState;
    try {
      dispatch(existingChatSlice.actions.setLoading(true))
      const response = await fetch(
        `${GET_CHAT_BY_ID}?chatId=${chatId}&paginationOffset=${state.existingChat.paginationOffset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setChat(data));
      }
    } catch (error) {
      console.log(error);
    } finally{
      dispatch(existingChatSlice.actions.setLoading(false))
    }
  }
);

export const addChatMember = createAsyncThunk(
  "existingChat/addChatMember",
  async (member: IChatMember, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(ADD_CHAT_MEMBER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChatId: state.existingChat.chatId,
          UserId: member.memberId,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addMessageToChat(data));
        dispatch(existingChatSlice.actions.addMember(member));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeMember = createAsyncThunk(
  "existingChat/removeMember",
  async (memberId: string, { getState, dispatch }) => {
    const state = getState() as RootState;

    try {
      const response = await fetch(REMOVE_CHAT_MEMBER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChatId: state.existingChat.chatId,
          UserId: memberId,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addMessageToChat(data));
        dispatch(existingChatSlice.actions.rmMember(memberId));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const toggleLike = createAsyncThunk(
  "chat/toggleLike",
  async (props: { messageId: number; userName: string }, { dispatch }) => {
    try {
      const response = await fetch(LIKE_MESSAGE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.messageId),
        credentials: "include",
      });

      if (response.ok) {
        dispatch(
          existingChatSlice.actions.likeOrUnlike({
            id: props.messageId,
            name: props.userName,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const renameChat = createAsyncThunk(
  "chat/renameChat",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    try {
      const response = await fetch(RENAME_GROUP_CHAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChatId: state.existingChat.chatId,
          NewChatName: state.newChat.chatName,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addMessageToChat(data));
        dispatch(
          existingChatSlice.actions.rename(state.newChat.chatName ?? "")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);

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
    setChat: (state, action: PayloadAction<IExistingChat>) => {

      const newState = { ...state, ...action.payload };

      const uniqueMessages = action.payload.messages.filter(
        (newMessage) =>
          !state.messages.some(
            (existingMessage) => existingMessage.messageId === newMessage.messageId
          )
      );

      newState.messages = [...uniqueMessages, ...state.messages];

      return newState;
    },
    resetChat: (state) => {
        state.chatId = null;
        state.chatName = null;
        state.hasMoreMessages = true;
        state.isLoading = false;
        state.members = [];
        state.messages = [];
        state.paginationOffset = 0;
    },
    addMessageToChat: (state, action: PayloadAction<IMessage>) => {
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

export const { setChat, resetChat, addMessageToChat, setCurrentChatId } =
  existingChatSlice.actions;

export default existingChatSlice.reducer;
