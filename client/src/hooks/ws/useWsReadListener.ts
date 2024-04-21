import { getSignalRConnection } from "./signalRConnection";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../useAppSelectorAndDispatch";
import { markChatAsRead } from "../../state/chatsOverviewSlice";
import { markMessagesAsRead } from "../../state/currentChatSlice";

const useWsReadListener = (currentChatId: number | null) => {
  const connection = getSignalRConnection();
  const dispatch = useAppDispatch();
  const currentChatIdRef = useRef(currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  useEffect(()=>{
    const handleRead = (data: {chatId: number,  username: string}) => {
        dispatch(markChatAsRead(data));
        if (data.chatId === currentChatId) {
         dispatch(markMessagesAsRead(data.username));
        }
    }
    connection.on("MarkChatAsRead", handleRead);
    return(()=>{
        connection.off("MarkChatAsRead", handleRead);
    })
  })

}

export default useWsReadListener;