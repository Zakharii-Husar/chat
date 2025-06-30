import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../APIEndpoints';
import { IUser, IMessage } from '../../Interfaces';

// Define types for API responses
export interface User {
  id: number;
  username: string;
  bio?: string;
  avatarFileName?: string;
}

export interface Chat {
  chatId: number;
  chatName: string;
  chatType: 'private' | 'group';
  lastMessage?: string;
  lastMessageTime?: string;
  senderId?: number;
  seenBy: number[];
}

// Use the existing IMessage interface for chat responses
export type ChatResponse = IMessage;

// Use the existing IUser interface for auth responses
export type AuthResponse = IUser;

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
}

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Chat', 'Message', 'Auth'],
  endpoints: (builder) => ({
    // Auth endpoints
    validateCookies: builder.query<AuthResponse, void>({
      query: () => ({
        url: '/Auth/SignIn/WithCookies',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),

    login: builder.mutation<AuthResponse, { username: string; password: string }>({
      query: (credentials) => ({
        url: '/Auth/SignIn/WithPass',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation<AuthResponse, { username: string; password: string; email: string }>({
      query: (userData) => ({
        url: '/Auth/SignUp/WithPass',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Chat endpoints - using IMessage structure
    getAllChats: builder.query<ChatResponse[], { itemsToSkip?: number; itemsToTake?: number }>({
      query: ({ itemsToSkip = 0, itemsToTake = 20 }) => ({
        url: `/Chats/All?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
      serializeQueryArgs: ({ queryArgs }) => {
        // Use a stable key for caching
        return 'allChats';
      },
      merge: (currentCache, newItems) => {
        // Merge new items with existing cache, avoiding duplicates
        const existingIds = new Set(currentCache.map(chat => chat.messageId));
        const filteredNewItems = newItems.filter(chat => !existingIds.has(chat.messageId));
        return [...currentCache, ...filteredNewItems];
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        // Only refetch if we're requesting from the beginning
        return currentArg?.itemsToSkip === 0;
      },
    }),

    getChatById: builder.query<{ chat: ChatResponse; messages: IMessage[] }, { chatId: number; itemsToSkip?: number; itemsToTake?: number }>({
      query: ({ chatId, itemsToSkip = 0, itemsToTake = 20 }) => ({
        url: `/Chats/All/${chatId}?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`,
        method: 'GET',
      }),
      providesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    getChatIdByUsername: builder.query<number, string>({
      query: (username) => ({
        url: `/Chats/Private/GetIdByUname/${username}`,
        method: 'GET',
      }),
      providesTags: (result, error, username) => [{ type: 'Chat', id: result }],
    }),

    createPrivateChat: builder.mutation<number, string>({
      query: (recipientUsername) => ({
        url: `/Chats/Private/Create/${recipientUsername}`,
        method: 'POST',
      }),
      invalidatesTags: ['Chat'],
    }),

    createGroupChat: builder.mutation<number, { name: string; usernames: string[] }>({
      query: (groupData) => ({
        url: '/Chats/Group/Create',
        method: 'POST',
        body: groupData,
      }),
      invalidatesTags: ['Chat'],
    }),

    addChatMember: builder.mutation<void, { chatId: number; username: string }>({
      query: ({ chatId, username }) => ({
        url: `/Chats/Group/${chatId}/AddMember/${username}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    removeChatMember: builder.mutation<void, { chatId: number; username: string }>({
      query: ({ chatId, username }) => ({
        url: `/Chats/Group/${chatId}/RmMember/${username}`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    renameGroupChat: builder.mutation<void, { chatId: number; newName: string }>({
      query: ({ chatId, newName }) => ({
        url: `/Chats/Group/${chatId}/Rename/${newName}`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    markChatAsRead: builder.mutation<void, number>({
      query: (chatId) => ({
        url: `/Chats/Group/${chatId}/MarkAsRead`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, chatId) => [{ type: 'Chat', id: chatId }],
    }),

    // Message endpoints
    sendMessage: builder.mutation<IMessage, { chatId: number; content: string }>({
      query: ({ chatId, content }) => ({
        url: `/Chats/${chatId}/Messages/Send`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    addLike: builder.mutation<void, { chatId: number; messageId: number }>({
      query: ({ chatId, messageId }) => ({
        url: `/Chats/${chatId}/Messages/${messageId}/AddLike`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    removeLike: builder.mutation<void, { chatId: number; messageId: number }>({
      query: ({ chatId, messageId }) => ({
        url: `/Chats/${chatId}/Messages/${messageId}/RmLike`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    markMessageAsDeleted: builder.mutation<void, { chatId: number; messageId: number }>({
      query: ({ chatId, messageId }) => ({
        url: `/Chats/${chatId}/Messages/${messageId}/MarkAsDeleted`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),

    // User endpoints
    getAllUsers: builder.query<IUser[], { itemsToSkip?: number; itemsToTake?: number }>({
      query: ({ itemsToSkip = 0, itemsToTake = 20 }) => ({
        url: `/Users?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`,
        method: 'GET',
      }),
      providesTags: ['User'],
      serializeQueryArgs: ({ queryArgs }) => {
        return 'allUsers';
      },
      merge: (currentCache, newItems) => {
        return [...currentCache, ...newItems];
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.itemsToSkip === 0;
      },
    }),

    searchUsers: builder.query<IUser[], { query: string; itemsToSkip?: number; itemsToTake?: number }>({
      query: ({ query, itemsToSkip = 0, itemsToTake = 20 }) => ({
        url: `/Users/Search?SearchPhrase=${query}&itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getUser: builder.query<IUser, string>({
      query: (username) => ({
        url: `/Users/${username}`,
        method: 'GET',
      }),
      providesTags: (result, error, username) => [{ type: 'User', id: username }],
    }),

    checkAvailability: builder.query<boolean, { type: string; value: string }>({
      query: ({ type, value }) => ({
        url: `/Users/IsTaken/${type}/${value}`,
        method: 'GET',
      }),
      transformResponse: (response: boolean) => !response, // Invert the response for availability
    }),

    uploadAvatar: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/Users/UploadAvatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    updateBio: builder.mutation<void, string>({
      query: (bio) => ({
        url: '/Users/UpdateBio',
        method: 'POST',
        body: { bio },
      }),
      invalidatesTags: ['User', 'Auth'],
    }),
  }),
});

// Export hooks for use in components
export const {
  useValidateCookiesQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetAllChatsQuery,
  useGetChatByIdQuery,
  useGetChatIdByUsernameQuery,
  useCreatePrivateChatMutation,
  useCreateGroupChatMutation,
  useAddChatMemberMutation,
  useRemoveChatMemberMutation,
  useRenameGroupChatMutation,
  useMarkChatAsReadMutation,
  useSendMessageMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
  useMarkMessageAsDeletedMutation,
  useGetAllUsersQuery,
  useSearchUsersQuery,
  useGetUserQuery,
  useCheckAvailabilityQuery,
  useUploadAvatarMutation,
  useUpdateBioMutation,
} = apiSlice; 