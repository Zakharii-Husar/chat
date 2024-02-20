import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { groupMessagesByChats } from '../chats/groupMessagesByChats';
import { MessageModel } from '../chats/chatsSlice';

import { mockAPI } from '../../app/mockAPI';


interface ChatModel {
    chat: MessageModel[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;

}

const initialState = {
    chat: [],
    loading: 'idle',
    error: null
} as ChatModel;

export const fetchAChat = createAsyncThunk(
    'users/fetchAChat',
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

export const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //FETCH ALL USERS
            .addCase(fetchAChat.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchAChat.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.chat = action.payload as MessageModel[];
            })
            .addCase(fetchAChat.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })

    },
})

//export const { updateSearchedUser } = messagesSlice.actions

export default chatSlice.reducer