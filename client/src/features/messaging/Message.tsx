import { IMessage } from "../../state/Interfaces";
import { formatDistanceToNow } from "date-fns";
import "../../style/scrollable.css";
import { MDBIcon } from "mdb-react-ui-kit";
const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });
  return (
    <li
      className={"p-2 bg-" + (message.seenBy.length > 0 ? "" : "primary")}
      key={message.chatId}
    >

        <div className="d-flex flex-row">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            alt="avatar"
            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
            width="60"
          />
          <div className="pt-1">
            <p className="fw-bold mb-0">{message.senderUserName}</p>
            <p className="small text-muted">
              {message.content.substring(0, 10) + "..."}
            </p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">{time}</p>
          <span className="text-muted float-end">
            <MDBIcon fas icon="check" />
          </span>
        </div>
    </li>
  );
};

export default Message;
