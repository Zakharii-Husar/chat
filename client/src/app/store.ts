import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/auth/login/loginSlice';
import registerReducer from '../features/auth/register/registerSlice';
import loggedInUserReducer from '../features/loggedInUserSlice';
import usersReducer from '../features/users/usersSlice';
import chatsReducer from '../features/messaging/chatsOverview/chatsOverviewSlice';
import sendMessageReducer from '../features/messaging/currentChat/sendMessageSlice';
import currentChatReducer from '../features/messaging/currentChat/currentChatSlice';
import createGroupReducer from '../features/messaging/groupChatControll/createGroupChat/createGroupSlice';
import viewUserReducer from '../features/users/viewUserSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    users: usersReducer,
    loggedInUser: loggedInUserReducer,
    viewUser: viewUserReducer,
    chats: chatsReducer,
    sendMessage: sendMessageReducer,
    createGroup: createGroupReducer, 
    currentChat: currentChatReducer
  },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;