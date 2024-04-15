import { getSignalRConnection } from "./signalRConnection";
import { useEffect } from "react";
import { useAppDispatch } from "../useAppSelectorAndDispatch";
import { prependChats } from "../../state/chatsOverviewSlice";
import { addMessageToChat } from "../../state/currentChatSlice";
import { IMessage } from "../../state/Interfaces";

const useWsMsgListener = (currentChatId: number | null) => {
  const connection = getSignalRConnection();
  const dispatch = useAppDispatch();


  useEffect(()=>{
    const handleNewMessage = (data: IMessage) => {
        dispatch(prependChats(data));
        if (data.chatId === currentChatId) {
          dispatch(addMessageToChat(data));
        }
    }
    connection.on("ReceiveNewMessage", handleNewMessage);
    return(()=>{
        connection.off("ReceiveNewMessage", handleNewMessage);
    })
  })

}

export default useWsMsgListener;
