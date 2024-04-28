import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppSelectorAndDispatch";

import { DisplayMessages } from "./displayMessages/DisplayMessages";
import { SendMessage } from "./sendMessage/SendMessage";
import { DisplayHeader } from "./displayHeader/DisplayHeader";

import { resetChat } from "../../../redux/slices/currentChatSlice";
import getChatByIdThunk from "../../../redux/thunks/getChatByIdThunk";
import useWsCurrentChatTracker from "../../../hooks/ws/useWsCurrentChatTracker";

import { Container, Row, Col } from "react-bootstrap";

export const CurrentChat: React.FC = () => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams();
  const parsedChatId = parseInt(chatId || "0", 10);
  useWsCurrentChatTracker(parsedChatId);

  useEffect(() => {
    const setChatStateOnLoad = () => {
      if (parsedChatId) dispatch(getChatByIdThunk(parsedChatId));
    };
    setChatStateOnLoad();

    const resetChatStateOnExit = () => {
      dispatch(resetChat());
    };

    return () => {
      resetChatStateOnExit();
    };
  }, []);

  return !parsedChatId ? (
    <h1>LOADING...</h1>
  ) : (
    <Container
      fluid
      className="d-flex m-0 p-0 w-100"
    >
      <Row className="d-flex w-100 m-0 justify-content-center">
        <Col sm={11} md={9} lg={6} xl={6}>
          <DisplayHeader />
          <DisplayMessages />
          <SendMessage />
        </Col>
      </Row>
    </Container>
  );
};
