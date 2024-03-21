import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppSelectorAndDispatch";

import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";

import { getChatById, resetChat } from "./existingChatSlice";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const existingChat = useAppSelector(data=>data.existingChat)

  const { chatId } = useParams();
  const parsedChatId = parseInt(chatId || "0", 10);

  //fetch chat by id
  useEffect(() => {
    const setChatStateOnLoad = () => {
      if (parsedChatId) dispatch(getChatById(parsedChatId));
    };
    setChatStateOnLoad();

    const resetChatStateOnExit = () =>{
      dispatch(resetChat());
    };

    return(()=>{
      resetChatStateOnExit();
    })
  }, [chatId, parsedChatId]);



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
