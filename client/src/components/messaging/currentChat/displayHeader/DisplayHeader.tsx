import ManageGroupChat from "../../groupChatControll/manageGroupChat/ManageGroup";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import Avatar from "../../../reusable/Avatar/Avatar";
import { formatUtcToLocal } from '../../../../utils/dateUtils';
import "./DisplayHeader.scss";

const formatLastVisit = (date: Date | null) => {
  if (!date) return "Last seen unknown";
  return `Last seen ${formatUtcToLocal(date)}`;
};

export const DisplayHeader: React.FC = () => {
  const CurrentUser = useAppSelector((state) => state.loggedInUser);
  const currentChat = useAppSelector((state) => state.currentChat);
  const filteredParticipants = currentChat?.members?.filter(
    (member) => member.userName !== CurrentUser.userName
  );

  const isAgroupChat = filteredParticipants.length !== 1;
  const interlocutor = filteredParticipants[0];
  const chatHeader =
    isAgroupChat && currentChat.chatName
      ? currentChat.chatName
      : interlocutor?.userName;

  return (
    <div className="chat-title">
      <div className="chat-title__content">
        <div className={`chat-title__avatar ${!isAgroupChat && interlocutor?.isOnline ? 'online' : ''}`}>
          <Avatar
            size="S"
            fileName={isAgroupChat ? null : interlocutor?.avatarName}
            isGroup={isAgroupChat}
          />
        </div>
        <div className="chat-title__info">
          {!isAgroupChat ? (
            <Link to={"/users/" + chatHeader}>
              <h3>{chatHeader}</h3>
            </Link>
          ) : (
            <h3>{chatHeader}</h3>
          )}
          {!isAgroupChat && (
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
      {isAgroupChat && <ManageGroupChat />}
    </div>
  );
};
