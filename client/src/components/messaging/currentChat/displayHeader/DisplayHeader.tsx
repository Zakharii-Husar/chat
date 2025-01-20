import ManageGroupChat from "../../groupChatControll/manageGroupChat/ManageGroup";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import Avatar from "../../../reusable/Avatar/Avatar";

export const DisplayHeader: React.FC = () => {
  const CurrentUser = useAppSelector((state) => state.loggedInUser);
  const currentChat = useAppSelector((state) => state.currentChat);
  const filteredParticipants = currentChat?.members?.filter(
    (member) => member.userName !== CurrentUser.userName
  );

  const isAgroupChat = filteredParticipants.length !== 1;
  const chatHeader =
    isAgroupChat && currentChat.chatName
      ? currentChat.chatName
      : filteredParticipants[0]?.userName;

  return (
    <div className="chat-title">
      {!isAgroupChat ? (
        <Link to={"/users/" + chatHeader}>
          <Avatar
            size="S"
            fileName={currentChat.messages?.[0]?.interlocutor?.avatarName ?? null}
            isGroup={false}
          />
          <h3>{chatHeader}</h3>
        </Link>
      ) : (
        <>
          <Avatar size="S" fileName={null} isGroup={true} />
          <h3>{chatHeader}</h3>
          <ManageGroupChat />
        </>
      )}
    </div>
  );
};
