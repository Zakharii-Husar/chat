import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GET_CHAT_BY_ID, LIKE_MESSAGE } from "../../app/APIEndpoints";
import type { RootState } from "../../app/store";
import { IExistingChat, IMessage } from "../../app/messagesInterfaces";

const initialState: IExistingChat = {
  id: null,
  chatName: null,
  membersNicknames: [],
  messages: [],
};

export const getChatById = createAsyncThunk(
  "existingChat/getChatById",
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
        console.log(data);
        dispatch(setChat(data));
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

export const existingChatSlice = createSlice({
    name: "existingChatSlice",
    initialState,
    reducers: {
      setCurrentChatId: (state, action: PayloadAction<number | null>) => {
        state.id = action.payload;
      },
      setChat: (state, action: PayloadAction<IExistingChat>) => {
        return action.payload;
      },
      addToChat: (state, action: PayloadAction<IMessage>) => {
        state.messages.push(action.payload);
      },
      likeOrUnlike:(
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
    }
});

export const {
    setChat,
    addToChat,
    setCurrentChatId
} = existingChatSlice.actions;
  
  export default existingChatSlice.reducer;
