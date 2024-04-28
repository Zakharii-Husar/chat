import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Row, Col } from 'react-bootstrap';
import Avatar from '../../reusable/Avatar';
import { useAppSelector } from '../../../hooks/useAppSelectorAndDispatch';
import { FaEye } from 'react-icons/fa';
import { IMessage } from '../../../redux/slices/Interfaces';

const ChatBody: React.FC<{ message: IMessage }> = ({ message }) => {
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });
  const currentUserName = useAppSelector((state) => state.loggedInUser.userName);
  const isRead = message.seenBy.length > 0;

  return (
    <li className="border p-2" key={message.chatId}>
      <Row className="align-items-center">
        <Col xs={2}>
          <Avatar
            size="M"
            fileName={message.senderAvatarName ?? null}
            editBtn={false}
            isGroup={false}
          />
        </Col>
        <Col>
          <p className="fw-bold mb-0">
            {message.senderUserName === currentUserName ? 'You' : message.senderUserName}
          </p>
          <p className="small text-muted">
            {message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '')}
          </p>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between mt-2">
        <Col xs="auto">
          <p className="small text-info mb-1">{time}</p>
        </Col>
        <Col xs="auto">
          {isRead && <FaEye />}
        </Col>
      </Row>
    </li>
  );
};

export default ChatBody;

