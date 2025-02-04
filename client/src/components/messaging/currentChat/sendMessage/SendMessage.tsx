import React from 'react';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../hooks/useAppSelectorAndDispatch';
import { setMessageContent } from '../../../../redux/slices/sendMessageSlice';
import sendMessageThunk from '../../../../redux/thunks/sendMessageThunk';
import { useCheckAuth } from '../../../../hooks/useCheckAuth';
import useWsGetTypingUsers from '../../../../hooks/ws/useWsGetTypingUsers';
import useWsTypingTracker from '../../../../hooks/ws/useWsTypingTracker';
import { FaPen } from 'react-icons/fa';

export const SendMessage: React.FC = () => {
  useCheckAuth();
  const typingStatuses = useWsGetTypingUsers();
  const wsTypingTracker = useWsTypingTracker();
  const dispatch = useAppDispatch();
  const messageToSend = useAppSelector((state) => state.sendMessage);
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const typingUsers = currentChat.chatId ? typingStatuses[currentChat.chatId] || [] : [];
  const isTyping = typingUsers.length > 0;

  const isStillMember = currentChat.members.some(
    (member) => member.id === currentUser.id
  );

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const send = () => {
    if (messageToSend.Content && messageToSend.Content.length > 0) {
      dispatch(sendMessageThunk());
      dispatch(setMessageContent(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleFocus = () => {
    wsTypingTracker.startTyping();
  };

  const handleBlur = () => {
    wsTypingTracker.stopTyping();
  };

  if (!currentChat.chatId || !isStillMember) return null;

  return (
    <>
      {isTyping && (
        <div className="typing-indicator">
          <FaPen className="typing-icon" />
          <span className="typing-text">
            {typingUsers[0]} is typing...
          </span>
        </div>
      )}
      <textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleMessageInput}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        value={messageToSend.Content ?? ""}
        rows={3}
      />
      <button className="send-button" onClick={send}>
        Send Message
      </button>
    </>
  );
};
