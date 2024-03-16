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

import { setCurrentChatId, getChatById } from "./existingChatSlice";
import { FaHeart } from "react-icons/fa";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const existingChat = useAppSelector((state) => state.existingChat);
  const newChat = useAppSelector((state) => state.newChat);

  const { chatId } = useParams();
  const parsedChatId = parseInt(chatId || "0", 10);


  //fetch chat by id
  useEffect(() => {
    if (parsedChatId) dispatch(getChatById(parsedChatId));
    console.log(parsedChatId);
  }, [parsedChatId]);


  return !parsedChatId ? (
    <h1>LOADING...</h1>
  ) : (
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
