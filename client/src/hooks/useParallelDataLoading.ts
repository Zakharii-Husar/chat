import { useEffect } from "react";
import { useAppSelector } from "./useAppSelectorAndDispatch";
import { useGetAllChatsQuery, useGetAllUsersQuery } from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { appendChats, setHasMore } from "../redux/slices/chatsOverviewSlice";
import { fetchAllUsers } from "../redux/slices/usersSlice";

export const useParallelDataLoading = () => {
  const dispatch = useDispatch();
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const existingChats = useAppSelector((state) => state.chats.chats);
  const existingUsers = useAppSelector((state) => state.users.allUsers);
  
  // Load chats and users in parallel with optimized caching
  const { 
    data: initialChats, 
    isLoading: isChatsLoading, 
    error: chatsError 
  } = useGetAllChatsQuery(
    { itemsToSkip: 0, itemsToTake: 20 },
    {
      skip: !currentUserId,
      refetchOnFocus: false,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: 60, // 1 minute cache
    }
  );

  const { 
    data: initialUsers, 
    isLoading: isUsersLoading, 
    error: usersError 
  } = useGetAllUsersQuery(
    { itemsToSkip: 0, itemsToTake: 20 },
    {
      skip: !currentUserId,
      refetchOnFocus: false,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: 120, // 2 minutes cache
    }
  );

  // Initialize data in Redux state when available
  useEffect(() => {
    if (initialChats && initialChats.length > 0 && existingChats.length === 0) {
      dispatch(appendChats(initialChats));
      if (initialChats.length < 20) {
        dispatch(setHasMore());
      }
    }
  }, [initialChats, existingChats.length, dispatch]);

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0 && existingUsers.length === 0) {
      dispatch(fetchAllUsers(initialUsers));
    }
  }, [initialUsers, existingUsers.length, dispatch]);

  return {
    isChatsLoading,
    isUsersLoading,
    chatsError,
    usersError,
    isLoading: isChatsLoading || isUsersLoading,
    hasData: (initialChats && initialChats.length > 0) || (initialUsers && initialUsers.length > 0)
  };
}; 