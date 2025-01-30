import { IMessage } from "../../../../redux/slices/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import "./GenericMessage.scss";

interface GenericMessageProps {
  message: IMessage;
}

const GenericMessage: React.FC<GenericMessageProps> = ({ message }) => {
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const isSender = message.senderId === currentUser.id;
  
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });

  const getMessageClass = () => {
    if (message.isDeleted) return "generic-message__content--deleted";
    if (message.isAutogenerated) return "generic-message__content--system";
    return "";
  };

  return (
    <div className={`generic-message ${isSender ? 'sender' : ''}`}>
      <div className={`generic-message__content ${getMessageClass()}`}>
        <span>{message.content}</span>
        <span className="time-stamp">{time}</span>
      </div>
    </div>
  );
};

export default GenericMessage;
