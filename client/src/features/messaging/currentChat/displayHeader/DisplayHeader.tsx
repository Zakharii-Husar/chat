import ManageGroupChat from "../../groupChatControll/manageGroupChat/ManageGroup";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";

export const DisplayHeader: React.FC = () => {
  const { nickname: loggedInUserName } = useAppSelector(
    (state) => state.auth.response
  );
  const existingChat = useAppSelector((state) => state.existingChat);
  const filteredParticipants = existingChat?.members?.filter(
    (member) => member.userName !== loggedInUserName
  );

  const isAgroupChat = filteredParticipants.length !== 1;
  const chatHeader =
    isAgroupChat && existingChat.chatName
      ? existingChat.chatName
      : filteredParticipants[0]?.userName;
  return (
    <h3 className="font-weight-bold mb-3 text-center text-lg-center p-2">
      {!isAgroupChat ? (
        <Link to={"/users/" + chatHeader}>{chatHeader}</Link>
      ) : (
        <div>
          <ManageGroupChat/>
          <h3>{chatHeader}</h3>
        </div>
      )}
    </h3>
  );
};
