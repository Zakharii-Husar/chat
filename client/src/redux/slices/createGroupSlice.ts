import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICreateChat, IChatMember } from "../../Interfaces";

const initialState: ICreateChat = {
  name: null,
  candidates: [],
};

//export
const createGroupSlice = createSlice({
  name: "createGroupSlice",
  initialState,
  reducers: {
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
      state.name = action.payload;
    },
  },
});

export const {
  addChatCandidates,
  resetChatCandidates,
  removeCandidate,
  setChatName,
} = createGroupSlice.actions;

export default createGroupSlice.reducer;
