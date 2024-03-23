import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/loginSlice';
import registerReducer from '../features/auth/registerSlice';
import usersReducer from '../features/users/usersSlice';
import chatsReducer from '../features/messaging/chatsOverview/chatsOverviewSlice';
import sendMessageReducer from '../features/messaging/currentChat/sendMessageSlice';
import currentChatReducer from '../features/messaging/currentChat/currentChatSlice';
import createGroupReducer from '../features/messaging/groupChatControll/createGroupChat/createGroupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    users: usersReducer,
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