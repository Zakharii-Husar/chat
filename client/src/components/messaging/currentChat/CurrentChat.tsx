import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppSelectorAndDispatch";

import { DisplayMessages } from "./displayMessages/DisplayMessages";
import { SendMessage } from "./sendMessage/SendMessage";
import { DisplayHeader } from "./displayHeader/DisplayHeader";

import { resetChat } from "../../../redux/slices/currentChatSlice";
import getChatByIdThunk from "../../../redux/thunks/getChatByIdThunk";
import useWsCurrentChatTracker from "../../../hooks/ws/useWsCurrentChatTracker";

import { SkeletonLoader } from "../../reusable/SkeletonLoader";
import "./CurrentChat.scss";

export const CurrentChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.currentChat.isLoading);
  const currentChat = useAppSelector((state) => state.currentChat);

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
  }, [dispatch, parsedChatId]);

  // Show skeleton loader when:
  // 1. No chatId is provided, OR
  // 2. We have a chatId but we're still loading and don't have chat data yet
  const shouldShowSkeleton = !parsedChatId || (isLoading && !currentChat.chatId);

  return shouldShowSkeleton ? (
    <div className="current-chat">
      <div className="current-chat__container">
        <div className="current-chat__header">
          <SkeletonLoader type="chatHeader" count={1} />
        </div>
        <div className="current-chat__messages">
          <div className="messages-scroll-container">
            <div className="messages-list">
              <SkeletonLoader type="messageItem" count={8} />
            </div>
          </div>
        </div>
        <div className="current-chat__input">
          <div className="send-message skeleton-input">
            <div className="skeleton-input-field"></div>
            <div className="skeleton-send-button"></div>
          </div>
        </div>
      </div>
    </div>
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
