import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { mockAPI } from '../../app/mockAPI';
import { GET_ALL_USERS } from '../../app/APIEndpoints';

export interface IUserModel {
    id: string;
    nickname: string;
}

interface IUsersModel {
    allUsers: IUserModel[]
    filteredUsers: IUserModel[]
    searchedUser: string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;
}

const initialState: IUsersModel = {
    allUsers: [],
    filteredUsers: [],
    searchedUser: null,
    loading: 'idle',
    error: null
};


export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        try {
            const response = await fetch(GET_ALL_USERS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
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

export const searchUsers = createAsyncThunk(
    'users/searchUsers',
    async (searchQuery: string) => {

        try {
            const response = JSON.stringify(mockAPI.users);
            const data = await JSON.parse(response);
            return data.filter((user: IUserModel) => user.nickname.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
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
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUserModel[]>) => {
                state.loading = 'succeeded';
                state.allUsers = action.payload;
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
            .addCase(searchUsers.fulfilled, (state, action: PayloadAction<IUserModel[]>) => {
                state.loading = 'succeeded';
                state.filteredUsers = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? null;
            });

    },
})

export const { updateSearchedUser } = usersSlice.actions

export default usersSlice.reducer
