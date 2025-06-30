import { useAppDispatch, useAppSelector } from "./useAppSelectorAndDispatch";
import { useGetAllChatsQuery } from "../redux/api/apiSlice";
import { appendChats, setHasMore } from "../redux/slices/chatsOverviewSlice";
import React from "react";

export const useOptimizedChats = () => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const existingChats = useAppSelector((state) => state.chats.chats);
  const hasMore = useAppSelector((state) => state.chats.hasMore);
  
  // Use RTK Query with caching for initial load
  const { data: initialChats, isLoading: isInitialLoading, error } = useGetAllChatsQuery(
    { itemsToSkip: 0, itemsToTake: 20 },
    {
      // Skip if no user is logged in
      skip: !currentUserId,
      // Refetch on window focus
      refetchOnFocus: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Cache for 30 seconds
      refetchOnMountOrArgChange: 30,
    }
  );

  // Load more chats function
  const loadMore = async () => {
    if (!hasMore || !currentUserId) return;
    
    const itemsToSkip = existingChats.length;
    const itemsToTake = 20;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5190/chat-api"}/Chats/All?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(appendChats(data));
        if (data.length < itemsToTake) {
          dispatch(setHasMore());
        }
      }
    } catch (error) {
      console.error('Error loading more chats:', error);
    }
  };

  // Initialize chats in Redux state if we have initial data
  React.useEffect(() => {
    if (initialChats && initialChats.length > 0 && existingChats.length === 0) {
      dispatch(appendChats(initialChats));
      if (initialChats.length < 20) {
        dispatch(setHasMore());
      }
    }
  }, [initialChats, existingChats.length, dispatch]);

  return {
    chats: existingChats,
    isLoading: isInitialLoading,
    error,
    loadMore,
    hasMore
  };
}; 