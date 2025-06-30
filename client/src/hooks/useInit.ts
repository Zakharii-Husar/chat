import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "./../hooks/useAppSelectorAndDispatch";
import useWsConnection from "./../hooks/ws/useWsConnection";
import useWsMsgListener from "./../hooks/ws/useWsMsgListener";
import useWsReadListener from "./../hooks/ws/useWsReadListener";
import { useOptimizedChats } from "./useOptimizedChats";

export const useInit = () => {
  useWsConnection();
  useWsMsgListener();
  useWsReadListener();
  
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  
  // Use optimized chats hook which handles caching automatically
  const { chats, isLoading } = useOptimizedChats();

  // The chats will be automatically loaded when the user is authenticated
  // No need to manually dispatch thunks
};
