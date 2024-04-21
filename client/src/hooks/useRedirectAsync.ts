import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "./useAppSelectorAndDispatch";

//Hook design to solve race condition. Ensures that redirection happens only after async thunk set chat id
export const useRedirectAsync = () => {
    const navigate = useNavigate();
    const currentChatId = useAppSelector(state => state.currentChat.chatId);
    const [redirectTrigger, setRedirectTrigger] = useState(false);

    useEffect(() => {
        if (redirectTrigger && currentChatId) {
            navigate("/chats/" + currentChatId);
            setRedirectTrigger(false);
        }
    }, [redirectTrigger, currentChatId, navigate]);

    return () => {
        setRedirectTrigger(true);
    };
}
