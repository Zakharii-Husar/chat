import React from 'react';
import Avatar from '../../reusable/Avatar/Avatar';
import { useAppSelector } from '../../../hooks/useAppSelectorAndDispatch';
import { IMessage } from '../../../redux/slices/Interfaces';
import { BsCheckAll, BsCheck } from 'react-icons/bs';
import { formatUtcToLocal } from '../../../utils/dateUtils';
import './ChatBody.scss';

const ChatBody: React.FC<{ message: IMessage }> = ({ message }) => {
  const time = formatUtcToLocal(message.sentAt);
  const currentUserName = useAppSelector((state) => state.loggedInUser.userName);
  const isRead = message.seenBy.length > 0;

  return (
    <div className="chat-body-container">
      <div className="message-content">
        <div className={`avatar-container ${message.senderIsOnline ? 'online' : ''}`}>
          <Avatar
            size="S"
            fileName={message.senderAvatarName ?? null}
            isGroup={false}
          />
        </div>
        <div className="message-details">
          <div className="sender-name">
            {message.senderUserName === currentUserName ? 'You' : message.senderUserName}
          </div>
          <div className="message-preview">
            {message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '')}
          </div>
        </div>
        <div className="message-meta">
          <span className="time-stamp">{time}</span>
          <span className="read-status">
            {isRead ? <BsCheckAll className="read-icon" /> : <BsCheck className="unread-icon" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;

