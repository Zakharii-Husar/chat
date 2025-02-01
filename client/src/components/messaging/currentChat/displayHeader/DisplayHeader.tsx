import ManageGroupChat from "../../groupChatControll/manageGroupChat/ManageGroup";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import Avatar from "../../../reusable/Avatar/Avatar";
import { formatUtcToLocal } from '../../../../utils/dateUtils';
import "./DisplayHeader.scss";
import { IUser } from "../../../../Interfaces";

const formatLastVisit = (date: Date | null) => {
  if (!date) return "Last seen unknown";
  return `Last seen ${formatUtcToLocal(date)}`;
};

export const DisplayHeader: React.FC = () => {
  const CurrentUser = useAppSelector((state) => state.loggedInUser);
  const currentChat = useAppSelector((state) => state.currentChat);
  const filteredParticipants = currentChat?.members?.filter(
    (member: IUser) => member.userName !== CurrentUser.userName
  );

  const interlocutor = filteredParticipants[0];
  const chatHeader = currentChat.isGroupChat && currentChat.chatName
    ? currentChat.chatName
    : interlocutor?.userName;

  return (
    <div className="chat-title">
      <div className="chat-title__content">
        <div className={`chat-title__avatar ${!currentChat.isGroupChat && interlocutor?.isOnline ? 'online' : ''}`}>
          <Avatar
            size="S"
            fileName={currentChat.isGroupChat ? null : interlocutor?.avatarName}
            isGroup={currentChat.isGroupChat}
          />
        </div>
        <div className="chat-title__info">
          {!currentChat.isGroupChat ? (
            <Link to={"/users/" + chatHeader}>
              <h3>{chatHeader}</h3>
            </Link>
          ) : (
            <h3>{chatHeader}</h3>
          )}
          {!currentChat.isGroupChat && (
            <div className={`chat-title__status ${
              interlocutor?.isOnline ? 'online-status' : 'offline-status'
            }`}>
              {interlocutor?.isOnline ? (
                <span>Online</span>
              ) : (
                <span>{formatLastVisit(interlocutor?.lastVisit)}</span>
              )}
            </div>
          )}
        </div>
      </div>
      {currentChat.isGroupChat && <ManageGroupChat />}
    </div>
  );
};
