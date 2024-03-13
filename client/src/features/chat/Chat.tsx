import { formatDistanceToNow } from 'date-fns';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppSelectorAndDispatch";
import {
  setMessageContent,
  sendMessageAsync,
  createChatOrGetIdAsync,
  resetChatParticipants,
  addChatParticipants,
} from "./newChatSlice";

import { setCurrentChatId, getChatById, toggleLike } from "./existingChatSlice";
import { FaHeart } from "react-icons/fa";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { state: locationState } = useLocation();
  const { id: loggedInUserId, nickname: loggedInUserName } = useAppSelector(
    (state) => state.auth.response
  );
  const existingChat = useAppSelector((state) => state.existingChat);
  const newChat = useAppSelector((state) => state.newChat);

  const filteredParticipants = existingChat.membersNicknames.filter(
    (member) => member !== loggedInUserName
  );

  //set chatId when transfered from Chats.tsx
  useEffect(() => {
    if (locationState?.chatId)
      dispatch(setCurrentChatId(locationState?.chatId));
  }, [locationState?.chatId]);

  //add recipient id to participantsIds when transfered from Users.tsx
  useEffect(() => {
    if (locationState?.recipientId) {
      dispatch(
        addChatParticipants({
          id: locationState?.recipientId,
          name: locationState?.recipientUsername,
        })
      );
    }
  }, [locationState?.recipientId]);

  //When transfered from Users.tsx fetch chatId based on participant
  useEffect(() => {
    if (!existingChat.id && newChat.participantsIds.length > 0) {
      dispatch(createChatOrGetIdAsync());
    }
  }, [existingChat.id, newChat.participantsIds]);

  //fetch chat itself by having chatId
  useEffect(() => {
    if (existingChat.id) dispatch(getChatById(existingChat.id));
  }, [existingChat.id]);

  //update url to chatid
  useEffect(() => {
    const url = `/chats/${existingChat.id?.toString()}`;
    if (existingChat.id !== 0) navigate(url, { replace: true });
  }, [existingChat.id]);

  //reset currentChatId and chatParticipants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatParticipants());
      dispatch(setCurrentChatId(null));
    };
  }, []);

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const sendMessage = () => {
    if (
      newChat.messageToSend.Content &&
      newChat.messageToSend.Content.length > 0
    )
      dispatch(sendMessageAsync());
    dispatch(setMessageContent(""));
  };

  const handleLike = (messageId: number) => {
    dispatch(toggleLike({ messageId: messageId, userName: loggedInUserName! }));
  };

  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <MDBContainer className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="9" xl="12">
        <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>
          <MDBTypography className="d-flex-column" listUnStyled>
            {existingChat.messages.map((message) => {
              const isSender = loggedInUserId === message.senderId;
              const time = getTimeAgo(message.sentAt);
              return (
                <li
                  className={`d-flex ${
                    isSender ? "flex-row-reverse" : ""
                  } mb-4`}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start mx-3 shadow-1-strong"
                    width="60"
                  />
                  <MDBCard style={{maxWidth: "50%", minWidth: "25%"}}>
                    <MDBCardHeader className="d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">{message.userName}</p>
                      <p className="text-muted small mb-0">
                        <MDBIcon far icon="clock" />{time}
                      </p>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">{message.content}</p>
                    </MDBCardBody>
                  </MDBCard>
                </li>
              );
            })}
            <li className="bg-white mb-3">
              <MDBTextArea
                onChange={handleMessageInput}
                placeholder="Type message..."
                value={newChat.messageToSend.Content ?? ""}
                label="Message"
                id="textAreaExample"
                rows={4}
              />
            </li>
            <MDBBtn
              onClick={sendMessage}
              color="info"
              rounded
              className="float-end"
            >
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
