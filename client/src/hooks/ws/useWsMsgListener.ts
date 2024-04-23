import { getSignalRConnection } from "./signalRConnection";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../useAppSelectorAndDispatch";
import { prependChat, updateChat } from "../../state/chatsOverviewSlice";
import { prependMsg, updateMsg } from "../../state/currentChatSlice";
import { IMessage } from "../../state/Interfaces";

const useWsMsgListener = () => {
  const connection = getSignalRConnection();
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.currentChat.chatId);
  const currentChatIdRef = useRef(currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  useEffect(() => {
    const handleNewMsg = (data: IMessage) => {
      console.log("WS incoming MSG:")
      console.log(data);
      dispatch(prependChat(data));
      if (data.chatId === currentChatId) {
        dispatch(prependMsg(data));
      }
    };

    const handleMsgUpdate = (data: IMessage) => {
      dispatch(updateChat(data));
      if (data.chatId === currentChatId) {
        dispatch(updateMsg(data));
      }
    };

    connection.on("ReceiveNewMessage", handleNewMsg);
    connection.on("UpdateMessage", handleMsgUpdate);
    return () => {
      connection.off("ReceiveNewMessage", handleNewMsg);
      connection.off("UpdateMessage", handleMsgUpdate);
    };
  });
};

export default useWsMsgListener;
