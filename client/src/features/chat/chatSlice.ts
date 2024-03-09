import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GET_CHAT_BY_ID, GET_CHAT_ID, SEND_MESSAGE } from '../../app/APIEndpoints';
import type { RootState } from "../../app/store";

import { IChat, IMessage } from '../../app/messagesInterfaces';


const initialState: IChat = {
    chatId: 0,
    messages: [],
    messageToSend: {
        Content: null,
        RepliedTo: null
    }
};

export const getChatIdAsync = createAsyncThunk(
    'chat/getChatIdAsync',
    async (participantsIds: string[], { getState, dispatch }) => {
        try {
            const response = await fetch(GET_CHAT_ID, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(participantsIds),
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
    'chat/sendMessageAsync',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(SEND_MESSAGE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...state.chat.messageToSend, ChatId: state.chat.chatId}),
                credentials: "include"
            });

            if (response.ok) {
                const messageResponse = await response.json();
                dispatch(chatSlice.actions.addToChat(messageResponse))
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const getChatById = createAsyncThunk(
    'chat/getChatById',
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
    'chat/toggleLike',
    async (messageId: number, { getState, dispatch }) => {
        try {
            const response = await fetch(GET_CHAT_BY_ID, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageId),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                if(data === "liked"){
                    dispatch(chatSlice.actions.likeMessage(messageId));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
);


export const chatSlice = createSlice({
    name: 'chatSlice',
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
        likeMessage: (state, action: PayloadAction<number>) => {
            //state.messageToSend.Content = action.payload;
        },
    },
})

export const { setMessageContent, setCurrentChatId } = chatSlice.actions

export default chatSlice.reducer