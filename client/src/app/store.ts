import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/loginSlice';
import registerReducer from '../features/auth/registerSlice';
import usersReducer from '../features/users/usersSlice';
import chatsReducer from '../features/messaging/chatsOverview/chatsOverviewSlice';
import newChatReducer from '../features/messaging/currentChat/newChatSlice';
import existingChatReducer from '../features/messaging/currentChat/currentChatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    users: usersReducer,
    chats: chatsReducer,
    newChat: newChatReducer,
    existingChat: existingChatReducer
  },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;