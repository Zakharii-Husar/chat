import { formatDistanceToNow } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import { MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import "../../../../style/scrollable.css";
import getChatByIdThunk from "../../../../thunks/getChatByIdThunk";
import Message from "./Message";
import GenericMessage from "./GenericMessage";

export const DisplayMessages = () => {
  const dispatch = useAppDispatch();
  const isLaoding = useAppSelector((state) => state.currentChat.isLoading);

  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const loadMore = () => {
    if (!isLaoding) dispatch(getChatByIdThunk(currentChat.chatId!));
  };

  console.log(currentChat.messages);

  return (
    <InfiniteScroll
      style={{ height: "50vh" }}
      className="scrollable flex-column-reverse"
      height={300}
      inverse={true}
      dataLength={currentChat.messages.length}
      next={loadMore}
      hasMore={currentChat.hasMoreMessages}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Beginning of the chat:</b>
        </p>
      }
    >
      <MDBTypography listUnStyled>
        {currentChat.messages.map((message) => {
          const isSender = currentUser.id === message.senderId;
          const isGeneric = message.isAutogenerated || message.isDeleted;
          return (
            <MDBRow
              key={message.messageId}
              className={
                "d-flex w-100 mb-2 justify-content-" +
                (isSender ? "end" : "start")
              }
            >
              <MDBCol sm={6} md={6} lg={6} xl={6}>
                {isGeneric ? (
                  <GenericMessage message={message} />
                ) : (
                  <Message message={message} />
                )}
              </MDBCol>
            </MDBRow>
          );
        })}
      </MDBTypography>
    </InfiniteScroll>
  );
};
