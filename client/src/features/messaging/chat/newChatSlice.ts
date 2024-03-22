import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { INewChat } from "../messagesInterfaces";
import { IChatMember } from "../../../features/messaging/messagesInterfaces";

const initialState: INewChat = {
  chatName: "", 
  members: [],
  messageToSend: {
    Content: null,
    RepliedTo: null,
  },
};

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
