import React from 'react';
import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
  type: 'chat' | 'user' | 'message' | 'chatHeader' | 'messageItem';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 3 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'chat':
        return (
          <div className="skeleton-chat">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
            </div>
          </div>
        );
      case 'user':
        return (
          <div className="skeleton-user">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-content">
              <div className="skeleton-name"></div>
              <div className="skeleton-status"></div>
            </div>
          </div>
        );
      case 'message':
        return (
          <div className="skeleton-message">
            <div className="skeleton-avatar small"></div>
            <div className="skeleton-content">
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          </div>
        );
      case 'chatHeader':
        return (
          <div className="skeleton-chat-header">
            <div className="skeleton-avatar-small"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
            </div>
          </div>
        );
      case 'messageItem':
        return (
          <div className="skeleton-message-item">
            <div className="skeleton-content">
              <div className="skeleton-message-text"></div>
              <div className="skeleton-message-text short"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // For message items, we want to randomly position them on different sides
  if (type === 'messageItem') {
    return (
      <div className="skeleton-loader">
        {Array.from({ length: count }, (_, index) => {
          const isSender = Math.random() > 0.5; // Randomly decide if it's a sender message
          const hasSecondLine = Math.random() > 0.3; // 70% chance of having a second line
          const textWidth = Math.random() * 0.4 + 0.3; // Random width between 30% and 70%
          const secondLineWidth = Math.random() * 0.3 + 0.2; // Random width between 20% and 50%
          
          return (
            <div key={index} className={`skeleton-item ${isSender ? 'skeleton-item--sender' : 'skeleton-item--receiver'}`}>
              <div className="skeleton-message-item">
                <div className="skeleton-content">
                  <div 
                    className="skeleton-message-text" 
                    style={{ width: `${textWidth * 100}%` }}
                  ></div>
                  {hasSecondLine && (
                    <div 
                      className="skeleton-message-text short" 
                      style={{ width: `${secondLineWidth * 100}%` }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="skeleton-loader">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}; 