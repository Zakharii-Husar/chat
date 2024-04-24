import { IMessage } from "../../state/Interfaces";
import { formatDistanceToNow } from "date-fns";
import "../../style/scrollable.css";
import { MDBIcon } from "mdb-react-ui-kit";
import Avatar from "../users/Avatar";

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });
  const isRead = message.seenBy.length > 0;
  return (
    <li
      className="border p-2"
      key={message.chatId}
    >
      <div className="d-flex flex-row">
        <Avatar
          size="M"
          fileName={message.senderAvatarName ?? null}
          editBtn={false}
          isGroup={false}
        />
        <div className="pt-1">
          <p className="fw-bold mb-0">{message.senderUserName}</p>
          <p className="small text-muted">
            {message.content.substring(0, 30) +
              (message.content.length > 30 ? "..." : "")}
          </p>
        </div>
      </div>
      <div className="pt-1 d-flex justify-content-between">
        <p className="small text-muted mb-1">{time}</p>
        <span style={{minWidth: "20px", minHeight: "20px"}} className="text-muted float-end">
          <MDBIcon className={"d-" +  (isRead ? "flex" : "none")} icon="check" />
        </span>
      </div>
    </li>
  );
};

export default Message;
