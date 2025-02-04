import React from 'react';
import { FaPen } from 'react-icons/fa';
import './TypingIndicator.scss';

interface TypingIndicatorProps {
  typingUsers: string[];
  variant?: 'chat' | 'preview';
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  typingUsers,
  variant = 'chat'
}) => {
  if (!typingUsers.length) return null;

  return (
    <div className={`typing-indicator typing-indicator--${variant}`}>
      <FaPen className="typing-icon" />
      <span className="typing-text">
        {typingUsers[0]} is typing...
      </span>
    </div>
  );
}; 