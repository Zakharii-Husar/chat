import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GET_CHAT, SEND_MESSAGE } from '../../app/APIEndpoints';
import type { RootState } from "../../app/store";

import { IChat, IMessage } from '../../app/messagesInterfaces';


const initialState: IChat = {
    chat: [],
    messageToSend: {
        ReceiverId: null,
        Content: null,
        RepliedTo: null
    }
};

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
                body: JSON.stringify(state.chat.messageToSend),
                credentials: "include"
            });

            if (response.ok) {
                const messageResponse = await response.json();
                dispatch(chatSlice.actions.addToChat(messageResponse));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchAChat = createAsyncThunk(
    'chat/fetchAChat',
    async (friendId: string, { getState, dispatch }) => {
        try {
            const response = await fetch(GET_CHAT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(friendId),
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


export const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {

        setChat: (state, action: PayloadAction<IMessage[]>) => {
            state.chat = action.payload;
        },
        addToChat: (state, action: PayloadAction<IMessage>) => {
            state.chat.push(action.payload);
        },
        setRecieverId: (state, action: PayloadAction<string>) => {
            state.messageToSend.ReceiverId = action.payload;
        },
        setMessageContent: (state, action: PayloadAction<string>) => {
            state.messageToSend.Content = action.payload;
        },
    },
})

export const { setRecieverId, setMessageContent } = chatSlice.actions

export default chatSlice.reducer