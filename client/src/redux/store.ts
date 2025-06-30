import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import loggedInUserReducer from './slices/loggedInUserSlice';
import usersReducer from './slices/usersSlice';
import chatsReducer from './slices/chatsOverviewSlice';
import sendMessageReducer from './slices/sendMessageSlice';
import currentChatReducer from './slices/currentChatSlice';
import createGroupReducer from './slices/createGroupSlice';
import viewUserReducer from './slices/viewUserSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    login: loginReducer,
    register: registerReducer,
    users: usersReducer,
    loggedInUser: loggedInUserReducer,
    viewUser: viewUserReducer,
    chats: chatsReducer,
    currentChat: currentChatReducer,
    sendMessage: sendMessageReducer,
    createGroup: createGroupReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;