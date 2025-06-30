import {
  useAppSelector,
} from "./../hooks/useAppSelectorAndDispatch";
import useWsConnection from "./../hooks/ws/useWsConnection";
import useWsMsgListener from "./../hooks/ws/useWsMsgListener";
import useWsReadListener from "./../hooks/ws/useWsReadListener";
import { useParallelDataLoading } from "./useParallelDataLoading";

export const useInit = () => {
  useWsConnection();
  useWsMsgListener();
  useWsReadListener();
  
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  
  // Use parallel data loading for better performance
  const { isLoading, hasData } = useParallelDataLoading();

  // The data will be automatically loaded in parallel when the user is authenticated
  // This reduces total load time by loading chats and users simultaneously
};
