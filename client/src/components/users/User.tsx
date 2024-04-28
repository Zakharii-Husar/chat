import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { MdModeEdit } from 'react-icons/md';
import {
  useAppSelector,
  useAppDispatch,
} from '../../hooks/useAppSelectorAndDispatch';
import Avatar from '../reusable/Avatar';
import getUserDetailsThunk from '../../redux/thunks/getUserDetailsThunk';
import getChatIdByUsernameThunk from '../../redux/thunks/getChatIdByUsernameThunk';
import createPrivateChatThunk from '../../redux/thunks/createPrivateChatThunk';
import { useRedirectAsync } from '../../hooks/useRedirectAsync';
import UpdateBio from './UpdateBio';

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
    <div className="gradient-custom-2">
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="9" xl="7">
            <Card>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: '#000', height: '200px' }}
              >
                <h3 className="d-flex position-absolute p-2">
                  {'@' + currentProfile.userName}
                </h3>
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: '150px' }}
                >
                  <Avatar
                    size="L"
                    fileName={currentProfile.avatarName}
                    editBtn={isMyPofile}
                    isGroup={false}
                  />
                  <Button
                    className={'my-2 ' + (isMyPofile ? 'd-none' : 'd-flex')}
                    variant="outline-dark"
                    style={{ height: '36px', overflow: 'visible' }}
                    onClick={() => navToChat(anotherUser.userName!)}
                  >
                    Send Message
                  </Button>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>{currentProfile.fullName}</h5>
                  <p>{currentProfile.email}</p>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">About</p>
                    <p className="small text-muted mb-0">
                      {currentProfile.bio}
                    </p>
                  </div>
                  <UpdateBio children={<MdModeEdit cursor="pointer" />} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
