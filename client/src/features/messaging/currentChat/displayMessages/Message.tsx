import { IMessage } from "../../../../state/Interfaces";
import { formatDistanceToNow } from "date-fns";
import Avatar from "../../../users/Avatar";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { TiDelete } from "react-icons/ti";
import markMsgAsDeletedThunk from "../../../../thunks/markMsgAsDeletedThunk";
import Confirmation from "../../Confirmation";
import addLikeThunk from "../../../../thunks/addLikeThunk";
import rmLikeThunk from "../../../../thunks/rmLikeThunk";
import { FaHeart } from "react-icons/fa";
import Likes from "./Likes";
import { useState } from "react";

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const currentChat = useAppSelector((state) => state.currentChat);
  const dispatch = useAppDispatch();
  const [displayLikes, setDisplayLikes] = useState(false);

  const deleteMsg = () => {
    dispatch(markMsgAsDeletedThunk(message.messageId));
  };

  const findLike = (messageId: number) => {
    const msgIndex = currentChat.messages.findIndex(
      (msg) => msg.messageId === messageId
    );
    const likes = currentChat.messages[msgIndex].likes;

    return likes.some((user) => user.id === currentUser.id);
  };

  const addLike = () => {
    const isAlreadyLiked = findLike(message.messageId);
    if (isAlreadyLiked) return;
    dispatch(addLikeThunk(message.messageId));
  };

  const rmLike = () => {
    const isAlreadyUnliked = !findLike(message.messageId);
    if (isAlreadyUnliked) return;
    dispatch(rmLikeThunk(message.messageId));
  };

  const isSender = message.senderId === currentUser.id;
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });
  const isRead = message.seenBy.length > 0;
  return (
    <li className="border p-2 position-relative" key={message.chatId} onDoubleClick={addLike}>
      <div className="d-flex flex-column">
        <span className="d-flex flex-row align-items-center">
          <Avatar
            size="M"
            fileName={message.senderAvatarName ?? null}
            editBtn={false}
            isGroup={false}
          />
          <p className="fw-bold">{isSender ? "You" : message.senderUserName}</p>
          <Confirmation titleText="Delete Message?" proceed={deleteMsg}>
            {" "}
            <TiDelete
              role="button"
              className={
                "text-danger position-absolute end-0 top-0 cursor-pointer " +
                (isSender ? "d-flex" : "d-none")
              }
              size={25}
            />
          </Confirmation>
        </span>
        <p
          style={{ overflowWrap: "break-word", flexShrink: 0 }}
          className="small text-muted"
        >
          {message.content}
        </p>
      </div>
      <span
        className={
          "w-100 justify-content-end position-absolue " +
          (displayLikes ? "d-flex" : "d-none")
        }
      >
        <Likes users={message.likes} />
      </span>
      <div className="pt-1 d-flex justify-content-between">
        <p className="small text-info mb-1">{time}</p>
        <span style={{ minWidth: "20px", minHeight: "20px" }}>
          <FaHeart
            onMouseEnter={() => setDisplayLikes(true)}
            onMouseLeave={() => setDisplayLikes(false)}
            onClick={rmLike}
            size={20}
            className={
              "text-danger end-0 bottom-0 w-20 " +
              (message.likes.length > 0 ? "d-flex" : "d-none")
            }
          />
        </span>
      </div>
    </li>
  );
};

export default Message;
