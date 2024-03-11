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
import { addToChat, setCurrentChatId } from "./existingChatSlice";

const initialState: IChat = {
  chatName: null,
  participantsIds: [],
  participantsUserNames: [],
  messageToSend: {
    Content: null,
    RepliedTo: null,
  },
};

export const createChatOrGetIdAsync = createAsyncThunk(
  "newChat/createChatOrGetIdAsync",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    //preventing duplicates
    const uniqueArr = state.newChat.participantsIds.filter(
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
            ChatName: state.newChat.chatName
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentChatId(data));
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
          ...state.newChat.messageToSend,
          ChatId: state.existingChat.id,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const messageResponse = await response.json();
        dispatch(addToChat(messageResponse));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const newChatSlice = createSlice({
  name: "newChatSlice",
  initialState,
  reducers: {
    setMessageContent: (state, action: PayloadAction<string>) => {
      state.messageToSend.Content = action.payload;
    },
    addChatParticipants: (state, action: PayloadAction<{id: string, name: string}>) => {
      if (state.participantsIds.includes(action.payload.id)) return;
      state.participantsIds.push(action.payload.id);
      state.participantsUserNames.push(action.payload.name);
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
  },
});

export const {
  setMessageContent,
  addChatParticipants,
  resetChatParticipants,
  removeParticipant,
  setChatName
} = newChatSlice.actions;

export default newChatSlice.reducer;
