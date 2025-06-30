import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch } from "./useAppSelectorAndDispatch";
import { useValidateCookiesQuery } from "../redux/api/apiSlice";
import { setLoggedInUser } from "../redux/slices/loggedInUserSlice";

export const useOptimizedAuth = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Use RTK Query hook with caching
  const { data: userData, isLoading, error } = useValidateCookiesQuery(undefined, {
    // Skip the query if we're on login/register pages
    skip: location.pathname === "/login" || location.pathname === "/register",
    // Refetch on window focus to keep auth state fresh
    refetchOnFocus: true,
    // Refetch on reconnect
    refetchOnReconnect: true,
    // Cache for 5 minutes
    refetchOnMountOrArgChange: 300,
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
      const isAuthPage = location.pathname === "/login" || 
                        location.pathname === "/register" || 
                        location.pathname === "/";
      
      // If we have user data, we're authenticated
      if (userData && isAuthPage) {
        navigate("/chats");
        return;
      }
      
      // If we have an error (not authenticated) and not on auth pages, redirect to home
      if (error && !isAuthPage) {
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