import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { groupMessagesByChats } from '../chats/groupMessagesByChats';
import { IMessage } from '../chats/chatsSlice';
import { mockAPI } from '../../app/mockAPI';
import { SEND_MESSAGE } from '../../app/globalVars';
import type { RootState } from "../../app/store";


interface IMessageToSend {
    ReceiverId: string | null,
    Content: string | null,
    RepliedTo: number | null
}

interface IChat {
    chat: IMessage[],
    messageToSend: IMessageToSend,
    sentMessage: IMessageToSend | undefined
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;

}


const initialState = {
    chat: [],
    messageToSend: {
        ReceiverId: null,
        Content: null,
        RepliedTo: null
    },
    sentMessage: undefined,
    loading: 'idle',
    error: null
} as IChat;

export const fetchAChat = createAsyncThunk(
    'chat/fetchAChat',
    async (i: string) => {
        try {
            const response = JSON.stringify(mockAPI.messages);
            const data = await JSON.parse(response);
            return [];
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
                body: JSON.stringify(state.chat.messageToSend),
                credentials: "include"
            });

            if (response.ok) {
                const usersList = await response.json();
                return usersList;
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
        setRecieverId: (state, action: PayloadAction<string>) => {
            state.messageToSend.ReceiverId = action.payload;
        },
        setMessageContent: (state, action: PayloadAction<string>) => {
            state.messageToSend.Content = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //FETCH MESSAGES
            .addCase(fetchAChat.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchAChat.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.chat = action.payload as IMessage[];
            })
            .addCase(fetchAChat.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })
            //SEND MESSAGE
            .addCase(sendMessageAsync.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(sendMessageAsync.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                //state.chat.sentMessage = action.payload;
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })

    },
})

export const { setRecieverId, setMessageContent } = chatSlice.actions

export default chatSlice.reducer