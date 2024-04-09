import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import registerReducer from './registerSlice';
import loggedInUserReducer from './loggedInUserSlice';
import usersReducer from './usersSlice';
import chatsReducer from './chatsOverviewSlice';
import sendMessageReducer from './sendMessageSlice';
import currentChatReducer from './currentChatSlice';
import createGroupReducer from './createGroupSlice';
import viewUserReducer from './viewUserSlice';

export const store = configureStore({
  reducer: {
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

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;