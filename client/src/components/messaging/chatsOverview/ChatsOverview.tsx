import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import "../../../style/_scrollable.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";
import CreateGroup from "../groupChatControll/createGroupChat/CreateGroup";
import getAllChatsThunk from "../../../redux/thunks/getAllChatsThunk";
import ChatBody from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { Link } from "react-router-dom";
import "./ChatsOverview.scss";
import PATH from "../../../routing/pathConstants";
import Loading  from "../../../components/reusable/Loading";

export const ChatsOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const chatsOverviewState = useAppSelector((state) => state.chats);
  const hasMore = chatsOverviewState.hasMore;

  const loadMore = useCallback(() => {
    if (hasMore) {
      dispatch(getAllChatsThunk());
    }
  }, [dispatch, hasMore]);

  const ChatItem = useCallback((index: number) => {
    if (!chatsOverviewState.chats?.[index]) {
      return <div className="chat-item loading">Loading...</div>;
    }

    const chat = chatsOverviewState.chats[index];
    const isRead = chat.seenBy.length > 0;

    return (
      <div className="chat-item">
        <Link
          to={`${PATH.chats}/${chat.chatId}`}
          className={`chat-link ${isRead ? "read" : "unread"}`}
        >
          <ChatHeader chat={chat} />
          <ChatBody message={chat} />
        </Link>
      </div>
    );
  }, [chatsOverviewState.chats]);

  if (!chatsOverviewState.chats) {
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
              totalCount={chatsOverviewState.chats.length}
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