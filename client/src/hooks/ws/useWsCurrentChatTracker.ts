import { useEffect } from "react";
import { getSignalRConnection } from "./signalRConnection";
import { useAppSelector } from "../useAppSelectorAndDispatch";

const useWsCurrentChatTracker = (currentChatId?: number) => {
    const connection = getSignalRConnection();
    const loadedChats = useAppSelector((state) => state.chats.chats);
    
    useEffect(() => {
        const isConnected = connection.state === "Connected";
        
        // Join all loaded chats to receive typing notifications
        const joinLoadedChats = () => {
            if (!isConnected) return;
            loadedChats.forEach(chat => {
                connection.invoke("JoinChat", chat.chatId);
            });
        };

        // Leave all chats when component unmounts
        const leaveLoadedChats = () => {
            if (!isConnected) return;
            loadedChats.forEach(chat => {
                connection.invoke("LeaveChat", chat.chatId);
            });
        };

        joinLoadedChats();

        return () => {
            leaveLoadedChats();
        };
    }, [connection, loadedChats]);

    // Handle current chat separately if provided
    useEffect(() => {
        const isConnected = connection.state === "Connected";
        
        if (currentChatId) {
            if (isConnected) {
                connection.invoke("JoinChat", currentChatId);
            }
            
            return () => {
                if (isConnected) {
                    connection.invoke("LeaveChat", currentChatId);
                }
            };
        }
    }, [currentChatId, connection]);
};

export default useWsCurrentChatTracker;
