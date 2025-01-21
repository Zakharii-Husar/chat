import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppSelectorAndDispatch";

import { DisplayMessages } from "./displayMessages/DisplayMessages";
import { SendMessage } from "./sendMessage/SendMessage";
import { DisplayHeader } from "./displayHeader/DisplayHeader";

import { resetChat } from "../../../redux/slices/currentChatSlice";
import getChatByIdThunk from "../../../redux/thunks/getChatByIdThunk";
import useWsCurrentChatTracker from "../../../hooks/ws/useWsCurrentChatTracker";

import Loading from "../../reusable/Loading";
import "./CurrentChat.scss";

export const CurrentChat: React.FC = () => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams();
  const parsedChatId = parseInt(chatId || "0", 10);
  useWsCurrentChatTracker(parsedChatId);

  useEffect(() => {
    const setChatStateOnLoad = () => {
      if (parsedChatId) dispatch(getChatByIdThunk(parsedChatId));
    };
    setChatStateOnLoad();

    return () => {
      dispatch(resetChat());
    };
  }, []);

  return !parsedChatId ? (
    <Loading />
  ) : (
    <div className="current-chat">
      <div className="current-chat__container">
        <div className="current-chat__header">
          <DisplayHeader />
        </div>
        <div className="current-chat__messages">
          <DisplayMessages />
        </div>
        <div className="current-chat__input">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};
