import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";

import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";

import {
  setMessageContent,
  sendMessageAsync,
  createChatOrGetIdAsync,
  resetChatParticipants,
  addChatParticipants,
} from "./newChatSlice";

import { setCurrentChatId, getChatById, toggleLike } from "./existingChatSlice";
import { FaHeart } from "react-icons/fa";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { state: locationState } = useLocation();
  const existingChat = useAppSelector((state) => state.existingChat);
  const newChat = useAppSelector((state) => state.newChat);

      
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

  return (
    <MDBContainer
      fluid
      className="d-flex m-0 p-0 w-100"
      style={{ backgroundColor: "#black" }}
    >
      <MDBRow className="bg-danger d-flex w-100 m-0 justify-content-center">
        <MDBCol className="bg-warning" sm={11} md={9} lg={6} xl={6}>
          <ChatHeader />
          <MessagesList />
          <MessageInput />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
