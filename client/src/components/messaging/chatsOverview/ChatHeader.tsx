import { IMessage } from "../../../Interfaces";
import Avatar from "../../reusable/Avatar/Avatar";
import "./ChatHeader.scss";

export const ChatHeader: React.FC<{ chat: IMessage }> = ({ chat }) => {
  const isGroup = chat.isGroupChat;
  const isOnline = !isGroup && chat.interlocutor?.isOnline;
  
  return (
    <div className="chat-header">
      <div className={`chat-header__avatar ${isOnline ? 'online' : ''}`}>
        <Avatar
          size="S"
          fileName={chat.interlocutor?.avatarName ?? null}
          isGroup={isGroup}
        />
      </div>
      <span className={`chat-header__name ${isGroup ? 'group' : ''}`}>
        {chat.interlocutor?.userName ?? chat.chatName}
      </span>
    </div>
  );
};
