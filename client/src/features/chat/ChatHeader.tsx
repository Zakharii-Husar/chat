import { ManageGroupChat } from "./ManageGroupChat";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";

export const ChatHeader: React.FC = () => {
  const { nickname: loggedInUserName } = useAppSelector(
    (state) => state.auth.response
  );
  const existingChat = useAppSelector((state) => state.existingChat);
  const filteredParticipants = existingChat.membersNicknames.filter(
    (member) => member !== loggedInUserName
  );

  const isAgroupChat = filteredParticipants.length !== 1;
  const chatHeader =
    isAgroupChat && existingChat.chatName
      ? existingChat.chatName
      : filteredParticipants[0];
  return (
    <h3 className="font-weight-bold mb-3 text-center text-lg-center p-2">
      {!isAgroupChat ? (
        <Link to={"/users/" + chatHeader}>{chatHeader}</Link>
      ) : (
        <ManageGroupChat />
      )}
    </h3>
  );
};
