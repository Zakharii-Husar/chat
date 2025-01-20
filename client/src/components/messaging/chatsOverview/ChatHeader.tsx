import { Container } from "react-bootstrap";
import { IMessage } from "../../../redux/slices/Interfaces";
import Avatar from "../../reusable/Avatar/Avatar";
import "./ChatHeader.scss";

export const ChatHeader: React.FC<{ chat: IMessage }> = ({ chat }) => {
  const isGroup = chat.chatName !== null;
  
  return (
    <Container className="chat-header">
      <div className="chat-header__avatar">
        <Avatar
          size="S"
          fileName={chat.interlocutor?.avatarName ?? null}
          isGroup={isGroup}
        />
      </div>
      <span className={`chat-header__name ${isGroup ? 'group' : ''}`}>
        {chat.interlocutor?.userName ?? chat.chatName}
      </span>
    </Container>
  );
};
