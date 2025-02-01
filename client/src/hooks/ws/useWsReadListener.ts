import { getSignalRConnection } from "./signalRConnection";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../useAppSelectorAndDispatch";
import { markChatAsRead } from "../../redux/slices/chatsOverviewSlice";
import { markMessagesAsRead } from "../../redux/slices/currentChatSlice";
import {  IUser } from "../../Interfaces";
import { useAppSelector } from "../useAppSelectorAndDispatch";

const useWsReadListener = () => {
  const connection = getSignalRConnection();
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.currentChat.chatId);
  const chatsOverview = useAppSelector(state=>state.chats.chats);
  const chatsOverviewRef = useRef(chatsOverview);
  const currentChatIdRef = useRef(currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
    chatsOverviewRef.current = chatsOverview;
  }, [currentChatId, chatsOverview]);

  useEffect(() => {
    const handleRead = (data: { chatId: number; user: IUser }) => {
      const index = chatsOverviewRef.current.findIndex(
        (chat) => chat.chatId === data.chatId
      );
      if (index !== -1) {
        dispatch(markChatAsRead(data));
      }
      if (data.chatId === currentChatId) {
        dispatch(markMessagesAsRead(data.user));
      }
    };
    connection.on("MarkChatAsRead", handleRead);
    return () => {
      connection.off("MarkChatAsRead", handleRead);
    };
  }, [connection, dispatch, currentChatId, chatsOverview]);
};

export default useWsReadListener;
