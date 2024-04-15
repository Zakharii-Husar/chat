import { getSignalRConnection } from "./signalRConnection";
import { useAppSelector } from "../useAppSelectorAndDispatch";
const useWsTypingTracker = () => {
    const connection = getSignalRConnection();
    const isConnected = connection.state  === "Connected";
    const currentChat = useAppSelector((state) => state.currentChat);
    const currentUser = useAppSelector((state) => state.loggedInUser);
    const startTyping = () => {
        if (!isConnected) return;
        connection
          .invoke("StartTyping", currentChat.chatId, currentUser.userName)
          .catch((err) => console.error("Error invoking StartTyping method:", err));
    };

    const stopTyping = () => {
        if (!isConnected) return;
        connection
        .invoke("StopTyping", currentChat.chatId, currentUser.userName)
        .catch((err) => console.error("Error invoking StartTyping method:", err));
    }

    return { startTyping, stopTyping}
};

export default useWsTypingTracker;