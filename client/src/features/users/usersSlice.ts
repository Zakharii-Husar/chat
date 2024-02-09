import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { mockAPI } from '../../app/mockAPI';

export interface UserModel {
    id: number;
    nickName: string;
}

interface UsersModel {
    allUsers: UserModel[]
    filteredUsers: UserModel[]
    searchedUser: string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;
}

const initialState = {
    allUsers: [],
    filteredUsers: [],
    searchedUser: null,
    loading: 'idle',
    error: null
} as UsersModel;


export const fetchAllUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = JSON.stringify(mockAPI.users);
            const data = await JSON.parse(response);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const searchUsers = createAsyncThunk(
    'users/searchUsers',
    async (searchQuery: string) => {

        try {
            const response = JSON.stringify(mockAPI.users);
            const data = await JSON.parse(response);
            return data.filter((user: UserModel) => user.nickName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }
);

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        updateSearchedUser: (state, action: PayloadAction<string | null>) => {
            state.searchedUser = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            //FETCH ALL USERS
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserModel[]>) => {
                state.loading = 'succeeded';
                state.allUsers = action.payload as UserModel[];
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            })

            //SEARCH USER
            .addCase(searchUsers.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action: PayloadAction<UserModel[]>) => {
                state.loading = 'succeeded';
                state.filteredUsers = action.payload as UserModel[];
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            });

    },
})

export const { updateSearchedUser } = usersSlice.actions

export default usersSlice.reducer
