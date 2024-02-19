import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { groupMessagesByChats } from './groupMessagesByChats';

import { mockAPI } from '../../app/mockAPI';


export interface MessageModel {
    "id": string
    "sender": string
    "reciever": string
    "content": string
    "time": string
    "isRead": boolean
    "replyToMsg": null | number
    "likedBy": null | number
};

interface ChatsModel {
    chats: MessageModel[][],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;
    
}

const initialState = {
    chats: [],
    loading: 'idle',
    error: null
} as ChatsModel;

export const fetchAllChats = createAsyncThunk(
    'users/fetchChats',
    async () => {
        try {
            const response = JSON.stringify(mockAPI.messages);
            const data = await JSON.parse(response);
            return groupMessagesByChats(data);
        } catch (error) {
            console.log(error);
        }
    }
);

export const chatsSlice = createSlice({
    name: 'chatsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //FETCH ALL USERS
            .addCase(fetchAllChats.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchAllChats.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.chats = action.payload as MessageModel[][];
            })
            .addCase(fetchAllChats.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })

    },
})

//export const { updateSearchedUser } = messagesSlice.actions

export default chatsSlice.reducer
