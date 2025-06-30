import { useAppSelector } from "./useAppSelectorAndDispatch";
import { useGetAllUsersQuery } from "../redux/api/apiSlice";

export const useOptimizedUsers = () => {
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  
  // Use RTK Query with caching
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery(
    { itemsToSkip: 0, itemsToTake: 20 },
    {
      // Skip if no user is logged in
      skip: !currentUserId,
      // Refetch on window focus
      refetchOnFocus: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Cache for 60 seconds
      refetchOnMountOrArgChange: 60,
    }
  );

  return {
    users: users || [],
    isLoading,
    error,
    refetch,
    hasMore: users ? users.length >= 20 : false
  };
}; 