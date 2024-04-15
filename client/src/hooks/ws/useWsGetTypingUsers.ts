import { getSignalRConnection } from "./signalRConnection";
import { useEffect, useState } from "react";
import { useAppSelector } from "../useAppSelectorAndDispatch";

const useWsGetTypingUsers = () => {
    const connection = getSignalRConnection();
    const currentUsername = useAppSelector((state) => state.loggedInUser.userName);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
  
    useEffect(()=>{
      
      const showTyping = (data: string[]) => {
        if(connection.state !== 'Connected') return;
        setTypingUsers(data.filter(uname=> uname !== currentUsername));
      }

      connection.on("TypingUsers", showTyping);
      return(()=>{
        connection.off("TypingUsers", showTyping);
      })
    }, [])

    return typingUsers
}

export default useWsGetTypingUsers;