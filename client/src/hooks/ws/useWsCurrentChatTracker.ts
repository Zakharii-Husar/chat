import { useEffect } from "react";
import { getSignalRConnection } from "./signalRConnection";

const useWsCurrentChatTracker = (currentChatId: number) => {
    const connection = getSignalRConnection();
  useEffect(() => {
    const isConnected = connection.state === "Connected";
    const enterChat = () => {
      if (!isConnected || !currentChatId) return;
      connection.invoke("JoinChat", currentChatId);
    };
    const leaveChat = () => {
      if (!isConnected || !currentChatId) return;
      connection.invoke("LeaveChat", currentChatId);
    };

    enterChat();

    return () => {
      leaveChat();
    };
  }, [currentChatId]);
};

export default useWsCurrentChatTracker;
