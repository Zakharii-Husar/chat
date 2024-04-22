import { getSignalRConnection } from "./signalRConnection";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../useAppSelectorAndDispatch";
import { markChatAsRead } from "../../state/chatsOverviewSlice";
import { markMessagesAsRead } from "../../state/currentChatSlice";
import { IUser } from "../../state/Interfaces";

const useWsReadListener = () => {
  const connection = getSignalRConnection();
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.currentChat.chatId);
  const chatsOverview = useAppSelector((state) => state.chats.chats);
  const chatsOverviewRef = useRef(chatsOverview);
  const currentChatIdRef = useRef(currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
    chatsOverviewRef.current = chatsOverview;
  }, [currentChatId, chatsOverview]);

  useEffect(() => {
    const handleRead = (data: { chatId: number; user: IUser }) => {
      const index = chatsOverview.findIndex(
        (chat) => chat.chatId === data.chatId
      );
      console.log(index);
      dispatch(markChatAsRead(data));
      if (index !== -1) {
        
        console.log("sss")
      }
      if (data.chatId === currentChatId) {
        dispatch(markMessagesAsRead(data.user));
      }
    };
    connection.on("MarkChatAsRead", handleRead);
    return () => {
      connection.off("MarkChatAsRead", handleRead);
    };
  });
};

export default useWsReadListener;
