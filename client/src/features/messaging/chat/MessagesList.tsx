import { formatDistanceToNow } from "date-fns";
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
} from "../../../hooks/useAppSelectorAndDispatch";
import "./Chat.css";
import { toggleLike } from "./existingChatSlice";
import { FaHeart } from "react-icons/fa";

export const MessagesList = () => {
    const dispatch = useAppDispatch();

  const existingChat = useAppSelector((state) => state.existingChat);
  const { id: loggedInUserId, nickname: loggedInUserName } = useAppSelector(
    (state) => state.auth.response
  );

  const handleLike = (messageId: number) => {
    dispatch(toggleLike({ messageId: messageId, userName: loggedInUserName! }));
  };

  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <MDBTypography
      className="scrollable d-flex flex-column justify-content-centre w-100"
      listUnStyled
    >
      {existingChat.messages.map((message) => {
        const isSender = loggedInUserId === message.senderId;
        const time = getTimeAgo(message.sentAt);
        return (
          <MDBRow
            key={message.messageId}
            className={
              "d-flex w-100 m-0 justify-content-" + (isSender ? "end" : "start")
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
                      {loggedInUserName === message.senderUserName
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
  );
};
