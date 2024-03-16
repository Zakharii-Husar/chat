import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";

import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";

import {
  createChatOrGetIdAsync,
  resetChatCandidats,
  addChatCandidats,
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

  const { chatId } = useParams();
  const parsedChatId = parseInt(chatId || '0', 10);


      
  //set chatId when transfered from Chats.tsx
  useEffect(() => {
    if (locationState?.chatId)
      dispatch(setCurrentChatId(locationState?.chatId));
  }, [locationState?.chatId]);

  //add recipient id to participantsIds when transfered from Users.tsx
  useEffect(() => {
    if (locationState?.recipientId && locationState?.recipientUsername) {
      dispatch(
        addChatCandidats({
          userName: locationState?.recipientUsername,
          memberId: locationState?.recipientId,
        })
      );
    }
  }, [locationState?.recipientId, locationState?.recipientUsername]);

  //When transfered from Users.tsx fetch chatId based on participant
  useEffect(() => {
    if (!existingChat.id && newChat.members.length > 0) {
      dispatch(createChatOrGetIdAsync());
    }
  }, [existingChat.id, newChat.members]);

  //fetch chat itself by having chatId
  useEffect(() => {
    if (parsedChatId) dispatch(getChatById(parsedChatId));
  }, [parsedChatId]);


  //reset currentChatId and chatParticipants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatCandidats());
      dispatch(setCurrentChatId(null));
    };
  }, []);

  return !parsedChatId ?<h1>LOADING...</h1> : (
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
