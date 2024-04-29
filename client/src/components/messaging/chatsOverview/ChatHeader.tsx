import { Container, Col, Row } from "react-bootstrap";
import { IMessage } from "../../../redux/slices/Interfaces";
import Avatar from "../../reusable/Avatar/Avatar";

export const ChatHeader: React.FC<{ chat: IMessage }> = ({ chat }) => {
  console.log(chat.interlocutor);
  return (
    <Container
      className="
      chatHeader
    d-flex 
    flex-row 
    align-items-center 
    justify-content-start
    border-bottom"
    >
      <span className="chatHeader me-2 my-1">
        <Avatar
          size="S"
          fileName={chat.interlocutor?.avatarName ?? null}
          editBtn={false}
          isGroup={chat.chatName !== null}
        />
      </span>
      <span className="">{chat.interlocutor?.userName ?? chat.chatName}</span>
    </Container>
  );
};
