import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import "../../../style/_scrollable.scss";
import { useAppSelector } from "../../../hooks/useAppSelectorAndDispatch";
import CreateGroup from "../groupChatControll/createGroupChat/CreateGroup";
import ChatBody from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { Link } from "react-router-dom";
import "./ChatsOverview.scss";
import PATH from "../../../routing/pathConstants";
import Loading from "../../../components/reusable/Loading";
import useWsCurrentChatTracker from "../../../hooks/ws/useWsCurrentChatTracker";
import { useOptimizedChats } from "../../../hooks/useOptimizedChats";

export const ChatsOverview: React.FC = () => {
  useWsCurrentChatTracker();
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const { chats, isLoading, loadMore, hasMore } = useOptimizedChats();

  const ChatItem = useCallback((index: number) => {
    if (!chats?.[index]) {
      return <div className="chat-item loading">Loading...</div>;
    }

    const chat = chats[index];
    const isRead = chat.seenBy.length > 0;
    const isSentByCurrentUser = chat.senderId === currentUser.id;

    return (
      <div className="chat-item">
        <Link
          to={`${PATH.chats}/${chat.chatId}`}
          className={`chat-link ${isRead ? "read" : "unread"} ${
            !isRead ? (isSentByCurrentUser ? "sent" : "received") : ""
          }`}
        >
          <ChatHeader chat={chat} />
          <ChatBody message={chat} />
        </Link>
      </div>
    );
  }, [chats, currentUser.id]);

  if (isLoading && chats.length === 0) {
    return <Loading />;
  }

  return (
    <div className="chats-overview">
      <CreateGroup />
      <div className="chats-overview__content">
        <div className="chats-overview__card">
          <div className="chats-overview__scroll-container">
            <Virtuoso
              style={{ height: "100%" }}
              totalCount={chats.length}
              itemContent={ChatItem}
              endReached={loadMore}
              className="scrollable"
            />
          </div>
        </div>
      </div>
    </div>
  );
};