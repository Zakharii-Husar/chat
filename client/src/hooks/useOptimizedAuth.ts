import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch } from "./useAppSelectorAndDispatch";
import { useValidateCookiesQuery } from "../redux/api/apiSlice";
import { setLoggedInUser } from "../redux/slices/loggedInUserSlice";

export const useOptimizedAuth = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
      
      // If we have user data, we're authenticated
      if (userData && isAuthPage) {
        navigate("/chats");
        return;
      }
      
      // If we have an error (not authenticated) and not on auth pages, redirect to home
      if (error && !isAuthPage && location.pathname !== "/") {
        navigate("/");
        return;
      }
    };

    // Only redirect after we've attempted to validate cookies
    if (!isLoading) {
      shouldRedirect();
    }
  }, [userData, error, isLoading, location.pathname, navigate]);

  return {
    isAuthenticated: !!userData,
    isLoading,
    userData,
    error
  };
}; 