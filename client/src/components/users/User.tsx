import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { MdModeEdit } from 'react-icons/md';
import {
  useAppSelector,
  useAppDispatch,
} from '../../hooks/useAppSelectorAndDispatch';
import Avatar from '../reusable/Avatar/Avatar';
import getUserDetailsThunk from '../../redux/thunks/getUserDetailsThunk';
import getChatIdByUsernameThunk from '../../redux/thunks/getChatIdByUsernameThunk';
import createPrivateChatThunk from '../../redux/thunks/createPrivateChatThunk';
import { useRedirectAsync } from '../../hooks/useRedirectAsync';
import UpdateBio from './UpdateBio';
import ChangePhotoButton from './ChangePhotoButton';
import { SkeletonLoader } from '../reusable/SkeletonLoader';
import './User.scss';

import { formatUtcToLocal } from '../../utils/dateUtils';
import { GET_AVATAR } from '../../APIEndpoints';
import CloseButton from '../reusable/CloseButton';
import { FaSearchPlus } from 'react-icons/fa';


const formatLastVisit = (date: Date | null) => {
  if (!date) return "Last seen unknown";
  return `Last seen ${formatUtcToLocal(date)}`;
};

// Skeleton component for user profile
const UserProfileSkeleton: React.FC = () => (
  <Container fluid className="py-5">
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="user-profile">
          <div className="user-profile__header">
            <div className="skeleton-username"></div>
            <div className="skeleton-status"></div>
            <div className="user-profile__content">
              <div className="user-profile__avatar-section">
                <div className="skeleton-avatar-large"></div>
                <div className="skeleton-button"></div>
              </div>
              <div className="user-profile__info">
                <div className="skeleton-name"></div>
                <div className="skeleton-email"></div>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="skeleton-title"></div>
                <div className="skeleton-bio"></div>
                <div className="skeleton-bio short"></div>
              </div>
              <div className="skeleton-edit-button"></div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default function User() {
  const redirectAsync = useRedirectAsync();
  const { userName } = useParams<{ userName: string }>();

  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector((state) => state.loggedInUser);
  const anotherUser = useAppSelector((state) => state.viewUser);
  const isMyPofile = loggedInUser.userName === userName;
  const currentProfile = isMyPofile ? loggedInUser : anotherUser;
  
  const navToChat = async (username: string) => {
    try {
      const action = await dispatch(getChatIdByUsernameThunk(username));
      if (action.payload) {
        redirectAsync();
        return;
      } else {
        await dispatch(createPrivateChatThunk(username));
        redirectAsync();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userName && !isMyPofile) {
      dispatch(getUserDetailsThunk(userName));
    }
  }, [userName, isMyPofile, dispatch]);

  // State for avatar modal
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  return !currentProfile.id ? (
    <UserProfileSkeleton />
  ) : (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="user-profile">
            <div className="user-profile__header">
              <h3 className="user-profile__username">
                @{currentProfile.userName}
              </h3>
              <div className={`status-indicator ${
                currentProfile.isOnline || isMyPofile ? 'status-indicator--online' : 'status-indicator--offline'
              }`}>
                {currentProfile.isOnline || isMyPofile ? (
                  <>
                    <div className="status-indicator__dot" />
                    <span>Online</span>
                  </>
                ) : (
                  <span>{formatLastVisit(currentProfile.lastVisit)}</span>
                )}
              </div>
              <div className="user-profile__content">
                <div className="user-profile__avatar-section">
                  <div 
                    className="avatar-zoom-wrapper"
                    onClick={() => currentProfile.avatarName && setShowAvatarModal(true)} 
                    style={{cursor: currentProfile.avatarName ? 'pointer' : 'default', position: 'relative'}}
                  >
                    <Avatar
                      size="L"
                      fileName={currentProfile.avatarName}
                      isGroup={false}
                    />
                    {currentProfile.avatarName && (
                      <span className="avatar-zoom-icon">
                        <FaSearchPlus />
                      </span>
                    )}
                  </div>
                  {isMyPofile ? (
                    <ChangePhotoButton />
                  ) : (
                    <button 
                      className="btn-message"
                      onClick={() => navToChat(anotherUser.userName!)}
                    >
                      Send Message
                    </button>
                  )}
                </div>
                <div className="user-profile__info">
                  <h5>{currentProfile.fullName}</h5>
                  <p>{currentProfile.email}</p>
                </div>
              </div>
            </div>
            {/* Avatar Full Screen Modal */}
            {showAvatarModal && (
              <div className="avatar-modal-overlay" onClick={() => setShowAvatarModal(false)}>
                <div className="avatar-modal-content" onClick={e => e.stopPropagation()}>
                  <CloseButton onClick={() => setShowAvatarModal(false)} className="avatar-modal-close-btn" />
                  <img
                    src={GET_AVATAR(currentProfile.avatarName || '')}
                    alt="Avatar Full Screen"
                    className="avatar-modal-img"
                  />
                </div>
              </div>
            )}
            {/* End Avatar Modal */}
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">About</h5>
                  <p className="text-muted">
                    {currentProfile.bio}
                  </p>
                </div>
                {isMyPofile && (
                  <UpdateBio>
                    <div className="edit-bio-button d-flex align-items-center">
                      <p className="mb-0">Edit</p>
                      <MdModeEdit className="edit-icon ms-2" />
                    </div>
                  </UpdateBio>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
