import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Container, Row, Col } from 'react-bootstrap';
import Avatar from '../../reusable/Avatar/Avatar';
import { useAppSelector } from '../../../hooks/useAppSelectorAndDispatch';
import { IMessage } from '../../../redux/slices/Interfaces';
import { BsCheckAll, BsCheck } from 'react-icons/bs';
import './ChatBody.scss';

const ChatBody: React.FC<{ message: IMessage }> = ({ message }) => {
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });
  const currentUserName = useAppSelector((state) => state.loggedInUser.userName);
  const isRead = message.seenBy.length > 0;

  return (
    <Container className="chat-body-container" key={message.chatId}>
      <Row className="message-content">
        <Col xs="auto" className="avatar-wrapper">
          <Avatar
            size="S"
            fileName={message.senderAvatarName ?? null}
            isGroup={false}
          />
        </Col>
        <Col className="message-text">
          <div className="sender-name">
            {message.senderUserName === currentUserName ? 'You' : message.senderUserName}
          </div>
          <div className="message-preview">
            {message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '')}
          </div>
        </Col>
      </Row>
      <Row className="message-meta">
        <Col xs="auto" className="time-stamp">
          {time}
        </Col>
        <Col xs="auto" className="read-status">
          {isRead ? <BsCheckAll className="read-icon" /> : <BsCheck className="unread-icon" />}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBody;

