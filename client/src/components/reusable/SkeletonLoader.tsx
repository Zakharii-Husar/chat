import React from 'react';
import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
  type: 'chat' | 'user' | 'message';
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
      default:
        return null;
    }
  };

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