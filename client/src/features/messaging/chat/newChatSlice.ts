import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CREATE_GROUP_CHAT, SEND_MESSAGE } from "../../../app/APIEndpoints";
import type { RootState } from "../../../app/store";
import { INewChat, IMessage } from "../messagesInterfaces";
import { addMessageToChat, setCurrentChatId } from "./existingChatSlice";
import { IChatMember } from "../../../features/messaging/messagesInterfaces";

const initialState: INewChat = {
  chatName: null,
  members: [],
  messageToSend: {
    Content: null,
    RepliedTo: null,
  },
};

export const createGroupChat = createAsyncThunk(
  "newChat/createGroupChat",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    //extracting only ID's
    const membersIsdArray = state.newChat.members.map(obj => obj.memberId);
    //preventing duplicates
    const uniqueArr = membersIsdArray.filter(
      (value, index, self) => value !== null && self.indexOf(value) === index
    );


    console.log(JSON.stringify({
      ParticipantUserIds: uniqueArr,
      ChatName: state.newChat.chatName,
    }));
    try {
      const response = await fetch(CREATE_GROUP_CHAT, {
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
        console.log("Thunk returned" + data)
        return data;
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
          ChatId: state.existingChat.chatId,
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
    addChatCandidats: (
      state,
      action: PayloadAction<IChatMember>
    ) => {
      if (state.members.some(member => 
        member.userName === action.payload.userName && 
        member.memberId === action.payload.memberId
    )) return;
      state.members.push(action.payload);
    },
    removeCandidat: (state, action: PayloadAction<number>) => {
      state.members.splice(action.payload, 1);
    },
    resetChatCandidats: (state) => {
      state.members = [];
    },
    setChatName: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
    },
  },
});

export const {
  setMessageContent,
  addChatCandidats,
  resetChatCandidats,
  removeCandidat,
  setChatName,
} = newChatSlice.actions;

export default newChatSlice.reducer;
