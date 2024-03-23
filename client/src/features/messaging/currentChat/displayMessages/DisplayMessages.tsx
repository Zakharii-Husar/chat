import { formatDistanceToNow } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import "../../../../style/scrollable.css";
import toggleLikeThunk from "../toggleLikeThunk";
import getChatByIdThunk from "../getChatByIdThunk";
import { FaHeart } from "react-icons/fa";

export const DisplayMessages = () => {
  const dispatch = useAppDispatch();
  const isLaoding = useAppSelector((state) => state.currentChat.isLoading);

  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.currentUser);

  const handleLike = (messageId: number) => {
    dispatch(
      toggleLikeThunk({ messageId: messageId, userName: currentUser.userName! })
    );
  };

  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <InfiniteScroll
      className="scrollable flex-column-reverse"
      height={300}
      inverse={true}
      dataLength={currentChat.messages.length}
      next={() => {
        if (!isLaoding) dispatch(getChatByIdThunk(currentChat.chatId!));
      }}
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
          const time = getTimeAgo(message.sentAt);
          return (
            <MDBRow
              key={message.messageId}
              className={
                "d-flex w-100 m-0 justify-content-" +
                (isSender ? "end" : "start")
              }
            >
              <MDBCol sm={6} md={6} lg={6} xl={6}>
                <li className={"d-flex w-100 mb-2"}>
                  <MDBCard className="d-flex w-100">
                    <MDBCardHeader
                      className={
                        "d-flex justify-content-end" +
                        (isSender ? "" : " flex-row-reverse")
                      }
                    >
                      <p className="fw-bold mb-0">
                        {currentUser.userName === message.senderUserName
                          ? "You"
                          : message.senderUserName}
                      </p>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-start mx-3 shadow-1-strong"
                        width="40"
                      />
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">{message.content}</p>
                    </MDBCardBody>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" />
                      {" " + time}
                    </p>
                  </MDBCard>
                </li>
              </MDBCol>
            </MDBRow>
          );
        })}
      </MDBTypography>
    </InfiniteScroll>
  );
};
