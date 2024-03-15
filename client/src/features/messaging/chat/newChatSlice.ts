import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GET_CHAT_ID, SEND_MESSAGE } from "../../../app/APIEndpoints";
import type { RootState } from "../../../app/store";
import { INewChat, IMessage } from "../messagesInterfaces";
import { addMessageToChat, setCurrentChatId } from "./existingChatSlice";

const initialState: INewChat = {
  chatName: null,
  members: [],
  messageToSend: {
    Content: null,
    RepliedTo: null,
  },
};

export const createChatOrGetIdAsync = createAsyncThunk(
  "newChat/createChatOrGetIdAsync",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    //extracting only ID's
    const membersIsdArray = state.newChat.members.map(obj => obj.memberId);
    //preventing duplicates
    const uniqueArr = membersIsdArray.filter(
      (value, index, self) => value !== null && self.indexOf(value) === index
    );


    try {
      const response = await fetch(GET_CHAT_ID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ParticipantUserIds: uniqueArr,
          ChatName: state.newChat.chatName,
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
        dispatch(addMessageToChat(messageResponse));
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
    addChatParticipants: (
      state,
      action: PayloadAction<{ userName: string; memberId: string }>
    ) => {
      if (state.members.some(member => 
        member.userName === action.payload.userName && 
        member.memberId === action.payload.memberId
    )) return;
      state.members.push(action.payload);
    },
    removeParticipant: (state, action: PayloadAction<number>) => {
      state.members.splice(action.payload, 1);
    },
    resetChatParticipants: (state) => {
      state.members = [];
    },
    setChatName: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
    },
  },
});

export const {
  setMessageContent,
  addChatParticipants,
  resetChatParticipants,
  removeParticipant,
  setChatName,
} = newChatSlice.actions;

export default newChatSlice.reducer;