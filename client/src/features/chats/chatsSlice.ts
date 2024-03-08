import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { mockAPI } from '../../app/mockAPI';
import { IChats, IMessage } from '../../app/messagesInterfaces';
import { GET_ALL_CHATS } from '../../app/APIEndpoints';

const initialState: IChats = {
    chats: []
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
    reducers: {
        // setFullName: (state, action: PayloadAction<string>) => {
        //     state.fullName = action.payload
        // },
    },
})

//export const { updateSearchedUser } = messagesSlice.actions

export default chatsSlice.reducer
