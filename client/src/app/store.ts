import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/loginSlice';
import registerReducer from '../features/auth/registerSlice';
import usersReducer from '../features/users/usersSlice';
import chatsReducer from '../features/chats/chatsSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    users: usersReducer,
    chats: chatsReducer,
    chat: chatReducer
  },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch