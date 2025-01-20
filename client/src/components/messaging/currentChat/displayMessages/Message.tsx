import { IMessage } from "../../../../redux/slices/Interfaces";
import { formatDistanceToNow } from "date-fns";
import Avatar from "../../../reusable/Avatar/Avatar";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { TiDelete } from "react-icons/ti";
import markMsgAsDeletedThunk from "../../../../redux/thunks/markMsgAsDeletedThunk";
import Confirmation from "../../../reusable/Confirmation";
import addLikeThunk from "../../../../redux/thunks/addLikeThunk";
import rmLikeThunk from "../../../../redux/thunks/rmLikeThunk";
import { FaHeart } from "react-icons/fa";
import Likes from "./Likes";
import { useState } from "react";
import "./Message.scss";

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

  return (
    <div className={`message-row ${isSender ? 'message-row--sender' : ''}`}>
      <div className="message-bubble" onDoubleClick={addLike}>
        <div className="message-header">
          <Avatar
            size="S"
            fileName={message.senderAvatarName ?? null}
            isGroup={false}
          />
          <span className="sender-name">
            {isSender ? "You" : message.senderUserName}
          </span>
          {isSender && (
            <Confirmation titleText="Delete Message?" proceed={deleteMsg}>
              <TiDelete className="delete-button" size={20} />
            </Confirmation>
          )}
        </div>
        
        <div className="message-content">
          {message.content}
        </div>

        <div className="message-footer">
          <span className="time-stamp">{time}</span>
          
          <div className="likes-container">
            {message.likes.length > 0 && (
              <FaHeart
                className="heart-icon"
                size={16}
                onMouseEnter={() => setDisplayLikes(true)}
                onMouseLeave={() => setDisplayLikes(false)}
                onClick={rmLike}
              />
            )}
            
            {displayLikes && message.likes.length > 0 && (
              <div className="likes-popup">
                <Likes users={message.likes} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
