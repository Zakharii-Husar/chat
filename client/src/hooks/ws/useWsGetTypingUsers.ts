import { getSignalRConnection } from "./signalRConnection";
import { useEffect, useState } from "react";
import { useAppSelector } from "../useAppSelectorAndDispatch";

interface TypingStatus {
  [chatId: number]: string[];
}

const useWsGetTypingUsers = () => {
    const connection = getSignalRConnection();
    const currentUsername = useAppSelector((state) => state.loggedInUser.userName);
    const loadedChats = useAppSelector((state) => state.chats.chats);
    const [typingStatuses, setTypingStatuses] = useState<TypingStatus>({});
  
    useEffect(() => {
      const showTyping = (chatId: number, users: string[]) => {
        if(connection.state !== 'Connected') return;
        
        setTypingStatuses(prev => ({
          ...prev,
          [chatId]: users.filter(uname => uname !== currentUsername)
        }));
      }

      connection.on("TypingUsers", showTyping);
      return(() => {
        connection.off("TypingUsers", showTyping);
      });
    }, [connection, currentUsername]);

    return typingStatuses;
}

export default useWsGetTypingUsers;