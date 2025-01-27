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
  const chatsLength = useAppSelector((state) => state.chats.chats.length);

  useEffect(() => {
    const initialLoad = () => {
      if (!currentUserId || chatsLength > 1) return;
      dispatch(getAllChatsThunk());
    };
    initialLoad();
  }, [currentUserId, chatsLength, dispatch]);
};
