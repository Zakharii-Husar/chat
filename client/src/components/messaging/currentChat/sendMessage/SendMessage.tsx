import React, { useRef, useEffect, useState } from 'react';
import { PiPaperPlaneTiltFill } from 'react-icons/pi';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../hooks/useAppSelectorAndDispatch';
import { setMessageContent } from '../../../../redux/slices/sendMessageSlice';
import sendMessageThunk from '../../../../redux/thunks/sendMessageThunk';
import { useCheckAuth } from '../../../../hooks/useCheckAuth';
import useWsGetTypingUsers from '../../../../hooks/ws/useWsGetTypingUsers';
import useWsTypingTracker from '../../../../hooks/ws/useWsTypingTracker';
import { TypingIndicator } from '../../../../components/reusable/TypingIndicator/TypingIndicator';
import './SendMessage.scss';

export const SendMessage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [, setIsExpanded] = useState(false);
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;
      setIsExpanded(newHeight > 40);
    }
  }, [messageToSend.Content]);

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const send = () => {
    if (messageToSend.Content?.trim()) {
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

  if (!currentChat.chatId || !isStillMember) return null;

  return (
    <div className="send-message-container">
      {isTyping && <TypingIndicator typingUsers={typingUsers} variant="chat" />}
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          onFocus={() => wsTypingTracker.startTyping()}
          onBlur={() => wsTypingTracker.stopTyping()}
          onChange={handleMessageInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          value={messageToSend.Content ?? ""}
          rows={1}
        />
        <button 
          className="send-button" 
          onClick={send}
          disabled={!messageToSend.Content?.trim()}
        >
          <PiPaperPlaneTiltFill />
        </button>
      </div>
    </div>
  );
};
