import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  GET_CHAT_BY_ID,
  GET_CHAT_ID,
  LIKE_MESSAGE,
  SEND_MESSAGE,
} from "../../app/APIEndpoints";
import type { RootState } from "../../app/store";
import { IChat, IMessage } from "../../app/messagesInterfaces";

const initialState: IChat = {
  chatId: 0,
  chatName: null,
  messages: [],
  participantsIds: [],
  participantsUserNames: [],
  messageToSend: {
    Content: null,
    RepliedTo: null,
  },
};

export const createChatOrGetIdAsync = createAsyncThunk(
  "chat/createChatOrGetIdAsync",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    //preventing duplicates
    const uniqueArr = state.chat.participantsIds.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    try {
      const response = await fetch(GET_CHAT_ID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ParticipantUserIds: uniqueArr,
            ChatName: state.chat.chatName
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(chatSlice.actions.setCurrentChatId(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendMessageAsync = createAsyncThunk(
  "chat/sendMessageAsync",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(SEND_MESSAGE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state.chat.messageToSend,
          ChatId: state.chat.chatId,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const messageResponse = await response.json();
        dispatch(chatSlice.actions.addToChat(messageResponse));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getChatById = createAsyncThunk(
  "chat/getChatById",
  async (chatId: number, { getState, dispatch }) => {
    try {
      const response = await fetch(GET_CHAT_BY_ID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatId),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(chatSlice.actions.setChat(data));
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
          chatSlice.actions.likeOrUnlike({
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

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setCurrentChatId: (state, action: PayloadAction<number>) => {
      state.chatId = action.payload;
    },
    setChat: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    addToChat: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    setMessageContent: (state, action: PayloadAction<string>) => {
      state.messageToSend.Content = action.payload;
    },
    addChatParticipantsId: (state, action: PayloadAction<string>) => {
      if (state.participantsIds.includes(action.payload)) return;
      state.participantsIds.push(action.payload);
    },
    addChatParticipantsUserName: (state, action: PayloadAction<string>) => {
      state.participantsUserNames.push(action.payload);
    },
    removeParticipant: (state, action: PayloadAction<number>) => {
      state.participantsIds.splice(action.payload, 1);
      state.participantsUserNames.splice(action.payload, 1);
    },
    resetChatParticipants: (state) => {
      state.participantsIds = [];
      state.participantsUserNames = [];
    },
    setChatName: (state, action: PayloadAction<string>) => {
        state.chatName = action.payload
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
  setMessageContent,
  setCurrentChatId,
  addChatParticipantsId,
  addChatParticipantsUserName,
  resetChatParticipants,
  removeParticipant,
  setChatName
} = chatSlice.actions;

export default chatSlice.reducer;
