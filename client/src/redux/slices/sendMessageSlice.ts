import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMessageToSend } from "./Interfaces";

const initialState: IMessageToSend = {
  Content: null,
  RepliedTo: null,
};

const sendMessageSlice = createSlice({
  name: "sendMessageSlice",
  initialState,
  reducers: {
    setMessageContent: (state, action: PayloadAction<string>) => {
      state.Content = action.payload;
    },
    setRepliedTo: (state, action: PayloadAction<number>) => {
        state.RepliedTo = action.payload;
    }
  },
});

export const { setMessageContent, setRepliedTo } = sendMessageSlice.actions;

export default sendMessageSlice.reducer;
