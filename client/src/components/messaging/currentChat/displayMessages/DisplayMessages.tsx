import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../../hooks/useAppSelectorAndDispatch';
import '../../../../style/_scrollable.scss';
import getChatByIdThunk from '../../../../redux/thunks/getChatByIdThunk';
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';
import GenericMessage from './GenericMessage';
import Loading from '../../../reusable/Loading';

export const DisplayMessages = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.currentChat.isLoading);
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const loadMore = () => {
    if (!isLoading) dispatch(getChatByIdThunk(currentChat.chatId!));
  };

  return (
    <InfiniteScroll
      style={{ height: '50vh' }}
      className="scrollable flex-column-reverse"
      height={300}
      inverse={true}
      dataLength={currentChat.messages.length}
      next={loadMore}
      hasMore={currentChat.hasMoreMessages}
      loader={<Loading/>}
      endMessage={<p style={{ textAlign: 'center' }}><b>Beginning of the chat:</b></p>}
    >
      <div>
        {currentChat.messages.map((message) => {
          const isSender = currentUser.id === message.senderId;
          const isGeneric = message.isAutogenerated || message.isDeleted;
          return (
            <Row
              key={message.messageId}
              className={`d-flex w-100 mb-2 justify-content-${isSender ? 'end' : 'start'}`}
            >
              <Col sm={6} md={6} lg={6} xl={6}>
                {isGeneric ? (
                  <GenericMessage message={message} />
                ) : (
                  <Message message={message} />
                )}
              </Col>
            </Row>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};
