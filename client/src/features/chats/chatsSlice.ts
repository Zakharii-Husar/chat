import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { groupMessagesByChats } from './groupMessagesByChats';

import { mockAPI } from '../../app/mockAPI';


export interface IMessage {
    "id": string
    "senderId": string
    "recieverId": string
    "content": string
    "time": string
    "isRead": boolean
    "replyToMsg": null | number
};

interface IChats {
    chats: IMessage[][],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;

}

const initialState = {
    chats: [],
    loading: 'idle',
    error: null
} as IChats;

export const fetchAllChats = createAsyncThunk(
    'chats/fetchChats',
    async () => {
        try {
            const response = JSON.stringify(mockAPI.messages);
            const data = await JSON.parse(response);
            return [];
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
                state.chats = action.payload as IMessage[][];
            })
            .addCase(fetchAllChats.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })

    },
})

//export const { updateSearchedUser } = messagesSlice.actions

export default chatsSlice.reducer
