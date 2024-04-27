import { IMessage } from "../../../redux/slices/Interfaces";
import Avatar from "../../users/Avatar";

export const ChatHeader: React.FC<{ chat: IMessage }> = ({ chat }) => {
  console.log(chat.interlocutor)
  return (
    <div className="d-flex flex-row align-items-center border text-primary">
      <Avatar
        size="S"
        fileName={chat.interlocutor?.avatarName ?? null}
        editBtn={false}
        isGroup={chat.chatName !== null}
      />
      <div>{chat.interlocutor?.userName ?? chat.chatName}</div>
    </div>
  );
};
