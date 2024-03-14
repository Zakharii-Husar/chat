
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppSelectorAndDispatch";

import { MessagesList } from "./MessagesList";

import { ManageGroupChat } from "./ManageGroupChat";
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
import "./Chat.css";

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

  const isAgroupChat = filteredParticipants.length !== 1;
  const chatHeader = isAgroupChat && existingChat.chatName ? existingChat.chatName : filteredParticipants[0];
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


  return (
    <MDBContainer
      fluid
      className="d-flex m-0 p-0 w-100"
      style={{ backgroundColor: "#black" }}
    >
      <MDBRow className="bg-danger d-flex w-100 m-0 justify-content-center">
        <MDBCol className="bg-warning" sm={11} md={9} lg={6} xl={6}>
          <h3 className="font-weight-bold mb-3 text-center text-lg-center p-2">
            {!isAgroupChat ? <Link to={"/users/" + chatHeader}>{chatHeader}</Link> :
            <ManageGroupChat/>}
          </h3>
          
          <MessagesList/>

          <div className="d-flex bg-white mb-3">
            <MDBTextArea
              onChange={handleMessageInput}
              placeholder="Type message..."
              value={newChat.messageToSend.Content ?? ""}
              label="Message"
              id="textAreaExample"
              rows={4}
            />
          </div>
          <MDBBtn
            onClick={sendMessage}
            color="info"
            rounded
            className="float-end"
          >
            Send
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
