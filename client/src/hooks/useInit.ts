import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "./../hooks/useAppSelectorAndDispatch";
import getAllChatsThunk from "./../redux/thunks/getAllChatsThunk";
import useWsConnection from "./../hooks/ws/useWsConnection";
import useWsMsgListener from "./../hooks/ws/useWsMsgListener";
import useWsReadListener from "./../hooks/ws/useWsReadListener";

export const useInit = () => {
  useWsConnection();
  useWsMsgListener();
  useWsReadListener();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const chatsOverviewState = useAppSelector((state) => state.chats);

  useEffect(() => {
    const initialLoad = () => {
      if (!currentUserId || chatsOverviewState.chats?.length > 1) return;
      dispatch(getAllChatsThunk());
    };
    initialLoad();
  }, [currentUserId, chatsOverviewState]);
};
