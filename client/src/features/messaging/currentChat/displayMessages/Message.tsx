import { IMessage } from "../../../../state/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { MDBIcon } from "mdb-react-ui-kit";
import Avatar from "../../../users/Avatar";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import { TiDelete } from "react-icons/ti";

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const currentUserName = useAppSelector(
    (state) => state.loggedInUser.userName
  );
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });
  const isRead = message.seenBy.length > 0;
  return (
    <li className="border p-2" key={message.chatId}>
      <div className="d-flex flex-column">
        <span className="d-flex flex-row align-items-center position-relative">
          <Avatar
            size="M"
            fileName={message.senderAvatarName ?? null}
            editBtn={false}
            isGroup={false}
          />
          <p className="fw-bold">
            {message.senderUserName === currentUserName
              ? "You"
              : message.senderUserName}
          </p>
          <TiDelete className="text-danger position-absolute end-0 top-0" size={25} />
        </span>
        <p
            style={{ overflowWrap: "break-word", flexShrink: 0 }}
            className="small text-muted"
          >
            {message.content}
          </p>
      </div>
      <div className="pt-1 d-flex justify-content-between">
        <p className="small text-info mb-1">{time}</p>
        <span
          style={{ minWidth: "20px", minHeight: "20px" }}
          className="text-muted float-end"
        >
          <MDBIcon
            className={"text-primary d-" + (isRead ? "flex" : "none")}
            icon="check"
          />
        </span>
      </div>
    </li>
  );
};

export default Message;
