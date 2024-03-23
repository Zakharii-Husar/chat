import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { INewChat } from "../messagesInterfaces";
import { IChatMember } from "../messagesInterfaces";

const initialState: INewChat = {
  chatName: "",
  candidates: [],
  messageToSend: {
    Content: null,
    RepliedTo: null,
  },
};

//export 
const newChatSlice = createSlice({
  name: "newChatSlice",
  initialState,
  reducers: {
    setMessageContent: (state, action: PayloadAction<string>) => {
      state.messageToSend.Content = action.payload;
    },
    addChatCandidates: (state, action: PayloadAction<IChatMember>) => {
      const alreadyAdded = state.candidates.some(
        (member) =>
          member.userName === action.payload.userName &&
          member.memberId === action.payload.memberId
      );
      if (alreadyAdded) return;
      state.candidates.push(action.payload);
    },
    removeCandidate: (state, action: PayloadAction<number>) => {
      state.candidates.splice(action.payload, 1);
    },
    resetChatCandidates: (state) => {
      state.candidates = [];
    },
    setChatName: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
    },
  },
});

// export const {
//   setMessageContent,
//   addChatCandidates,
//   resetChatCandidates,
//   removeCandidate,
//   setChatName,
// } = newChatSlice.actions;

//export default newChatSlice.reducer;
