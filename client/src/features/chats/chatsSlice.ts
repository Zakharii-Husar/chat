import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../app/messagesInterfaces';
import { GET_ALL_CHATS } from '../../app/APIEndpoints';

const initialState: IMessage[] | null = [];

export const fetchAllChats = createAsyncThunk(
    'chats/fetchChats',
    async (_, { getState, dispatch }) => {
        try {
            const response = await fetch(GET_ALL_CHATS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (response.ok) {
                const allChats = await response.json();
                dispatch(chatsSlice.actions.setChats(allChats));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const chatsSlice = createSlice({
    name: 'chatsSlice',
    initialState,
    reducers: {
        setChats: (state, action) => {
            return action.payload
        },
    },
})


export default chatsSlice.reducer
