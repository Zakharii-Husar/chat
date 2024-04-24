import { IMessage } from "../../../../state/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { MDBIcon } from "mdb-react-ui-kit";
import Avatar from "../../../users/Avatar";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { TiDelete } from "react-icons/ti";
import markMsgAsDeletedThunk from "../../../../thunks/markMsgAsDeletedThunk";

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const dispatch = useAppDispatch();

  const deleteMsg = () => {
    dispatch(markMsgAsDeletedThunk(message.messageId));
  };

  const isSender = message.senderId === currentUserId;
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
          <p className="fw-bold">{isSender ? "You" : message.senderUserName}</p>
          <TiDelete
            role="button"
            onClick={deleteMsg}
            className={
              "text-danger position-absolute end-0 top-0 cursor-pointer " +
              (isSender ? "d-flex" : "d-none")
            }
            size={25}
          />
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
