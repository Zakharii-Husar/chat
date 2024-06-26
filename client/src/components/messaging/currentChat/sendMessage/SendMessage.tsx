import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../hooks/useAppSelectorAndDispatch';
import { setMessageContent } from '../../../../redux/slices/sendMessageSlice';
import sendMessageThunk from '../../../../redux/thunks/sendMessageThunk';
import { getSignalRConnection } from '../../../../hooks/ws/signalRConnection';
import { useCheckAuth } from '../../../../hooks/useCheckAuth';
import useWsGetTypingUsers from '../../../../hooks/ws/useWsGetTypingUsers';
import useWsTypingTracker from '../../../../hooks/ws/useWsTypingTracker';

export const SendMessage: React.FC = () => {
  useCheckAuth();
  const wsTypingUsers = useWsGetTypingUsers();
  const wsTypingTracker = useWsTypingTracker();
  const dispatch = useAppDispatch();
  const messageToSend = useAppSelector((state) => state.sendMessage);
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const isStillMember = currentChat.members.some(
    (member) => member.id === currentUser.id
  );

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const send = () => {
    if (messageToSend.Content && messageToSend.Content.length > 0)
      dispatch(sendMessageThunk());
    dispatch(setMessageContent(''));
  };
  const handleFocus = () => {
    wsTypingTracker.startTyping();
  };

  const handleBlur = () => {
    wsTypingTracker.stopTyping();
  };

  return !currentChat.chatId && !isStillMember ? null : (
    <div>
      {wsTypingUsers.length > 0 && <span>{wsTypingUsers[0] + ' is typing...'}</span>}
      <div className="d-flex bg-white mb-3">
        <Form.Control
          as="textarea"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleMessageInput}
          placeholder="Type message..."
          value={messageToSend.Content ?? ''}
          rows={4}
        />
      </div>
      <Button onClick={send} variant="info" className="float-end">
        Send
      </Button>
    </div>
  );
};
