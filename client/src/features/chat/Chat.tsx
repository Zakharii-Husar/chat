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

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { state: locationState } = useLocation();
  const { id: loggedInUserId, nickname: loggedInUserName } = useAppSelector(
    (state) => state.auth.response
  );
  const existingChat = useAppSelector((state) => state.existingChat);
  const newChat = useAppSelector((state) => state.newChat);

  //set chatId when transfered from Chats.tsx
  useEffect(() => {
    if (locationState?.chatId) dispatch(setCurrentChatId(locationState?.chatId));
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

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Container
      style={{ backgroundColor: "yellow" }}
      fluid
      className="d-flex flex-column vw-100"
    >
      <h1>
        Chatname: {existingChat.chatName ?? existingChat.membersNicknames[0]}
      </h1>
      <Row
        style={{ height: "70vh", overflowY: "auto" }}
        className="d-flex flex-column align-items-center justify-content-center w-100 mt-3"
      >
        <Col xs={12} md={8} lg={4} xl={2}>
          <ListGroup className="">
            {existingChat.messages?.map((message, i) => {
              const alignSelf = `align-self-${
                message.senderId === loggedInUserId ? "end" : "start"
              }`;
              return (
                <ListGroup.Item
                  style={{ backgroundColor: "blue" }}
                  key={message.messageId || i}
                  className={`d-flex flex-column ${alignSelf}
                                     align-items-start justify-content-between py-1
                                      w-50`}
                >
                  <div
                    className="d-flex flex-column w-100"
                    onClick={() => handleLike(message.messageId)}
                  >
                    <p>{message.content}</p>
                    {message.likes.length > 0 ? <FaHeart /> : null}
                    <p
                      style={{ backgroundColor: "grey" }}
                      className={`d-flex ${alignSelf}`}
                    >
                      {message.sentAt}
                    </p>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            onChange={handleMessageInput}
            type="text"
            placeholder="Type message..."
            value={newChat.messageToSend.Content ?? ""}
          />
          <Button onClick={sendMessage}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};
