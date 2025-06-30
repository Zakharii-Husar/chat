import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "./useAppSelectorAndDispatch";
import { useValidateCookiesQuery } from "../redux/api/apiSlice";
import { setLoggedInUser } from "../redux/slices/loggedInUserSlice";

export const useOptimizedAuth = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the current logged in user state
  const loggedInUser = useAppSelector(state => state.loggedInUser);

  // Use RTK Query hook with aggressive caching for faster initial loads
  const { data: userData, isLoading, error } = useValidateCookiesQuery(undefined, {
    // Skip the query if we're on login/register pages
    skip: location.pathname === "/login" || location.pathname === "/register",
    // Disable refetch on focus to reduce requests
    refetchOnFocus: false,
    // Refetch on reconnect only
    refetchOnReconnect: true,
    // Cache for 15 minutes to reduce requests
    refetchOnMountOrArgChange: 900,
    // Reduce polling to 10 minutes
    pollingInterval: 600000, // 10 minutes
  });

  useEffect(() => {
    // Update logged in user state when data changes
    if (userData) {
      dispatch(setLoggedInUser(userData));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    // Handle redirects based on auth state
    const shouldRedirect = () => {
      const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
      const isPublicPage = location.pathname === "/";
      
      // Check if user is authenticated (has an ID)
      const isAuthenticated = loggedInUser.id !== null;
      
      // If we have user data, we're authenticated
      if (userData && isAuthPage) {
        navigate("/chats");
        return;
      }
      
      // If user is not authenticated and trying to access protected routes, redirect to home
      if (!isAuthenticated && !isAuthPage && !isPublicPage) {
        navigate("/");
        return;
      }
    };

    // Only redirect after we've attempted to validate cookies or if we have a clear auth state
    if (!isLoading || loggedInUser.id !== null) {
      shouldRedirect();
    }
  }, [userData, error, isLoading, location.pathname, navigate, loggedInUser.id]);

  return {
    isAuthenticated: !!userData || loggedInUser.id !== null,
    isLoading,
    userData,
    error
  };
}; 