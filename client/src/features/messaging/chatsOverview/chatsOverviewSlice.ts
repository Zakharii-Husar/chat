import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../messagesInterfaces";
import { GET_ALL_CHATS } from "../../../app/APIEndpoints";
import { RootState } from "../../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IChatsOverview {
  chats: IMessage[],
  paginationOffset: number,
  hasMore: boolean,
  isLoading: boolean
}

const initialState: IChatsOverview = {
  chats: [],
  paginationOffset: 0,
  hasMore: true,
  isLoading: false,
};

export const fetchAllChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(
        `${GET_ALL_CHATS}?paginationOffset=${state.chats.paginationOffset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(chatsSlice.actions.setChats(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const chatsSlice = createSlice({
  name: "chatsSlice",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChatsOverview>) => {
      const newState = { ...state, ...action.payload };

      const uniqueChats = action.payload.chats.filter(
        (newChat) =>
          !state.chats.some(
            (existingChat) =>
              existingChat.chatId === newChat.chatId
          )
      );
      newState.chats = [...state.chats, ...uniqueChats];

      return newState;
    },
  },
});

export default chatsSlice.reducer;
