import { useEffect } from 'react';
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
import './User.scss';
import { formatDistanceToNow } from 'date-fns';

const formatLastVisit = (date: Date) => {
  return `Last seen ${formatDistanceToNow(new Date(date), { addSuffix: true })}`;
};

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
  }, [userName]);

  return !currentProfile.id ? (
    <h1>LOADING...</h1>
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
                  <span>{formatLastVisit(currentProfile.lastVisit!)}</span>
                )}
              </div>
              <div className="user-profile__content">
                <div className="user-profile__avatar-section">
                  <Avatar
                    size="L"
                    fileName={currentProfile.avatarName}
                    isGroup={false}
                  />
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
