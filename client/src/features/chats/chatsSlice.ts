import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { mockAPI } from '../../app/mockAPI';
import { IChats, IMessage } from '../../app/messagesInterfaces';

const initialState: IChats = {
    chats: [],
    loading: 'idle',
    error: null
};

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
