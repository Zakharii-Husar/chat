import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppSelectorAndDispatch";
import {
  setMessageContent,
  sendMessageAsync,
  createChatOrGetIdAsync,
  resetChatParticipants,
  addChatParticipants
} from "./newChatSlice";

import { setCurrentChatId, getChatById, toggleLike  } from "./existingChatSlice";
import { FaHeart } from "react-icons/fa";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export const Chat: React.FC = () => {
  const { state: locationState } = useLocation();
  const recipientId = locationState?.recipientId ?? null;
  const recipientUsername = locationState?.recipientUsername ?? null;
  const locationStateChatId = locationState?.chatId ?? null;

  const { id: loggedInUserId } = useAppSelector((state) => state.auth.response);
  const userName = useAppSelector((state) => state.auth.response.nickname);
  const { participantsIds, participantsUserNames } = useAppSelector(
    (state) => state.newChat
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { Content: msgContent } = useAppSelector(
    (state) => state.newChat.messageToSend
  );

  const chatId = useAppSelector((state) => state.existingChat.id);

  const { messages, chatName, membersNicknames } = useAppSelector((state) => state.existingChat);

  useEffect(()=>{
    console.log(messages);
  }, [messages])

  useEffect(() => {
    console.log(participantsUserNames);
  }, [participantsUserNames]);

  //set chatId if present
  useEffect(() => {
    if (locationStateChatId) dispatch(setCurrentChatId(locationStateChatId));
  }, [locationStateChatId]);

  //add recipient id to participantsIds
  useEffect(() => {
    if (recipientId) {
      dispatch(addChatParticipants({id: recipientId, name: recipientUsername}));
    }
  }, [recipientId]);
  //fetch chat id
  useEffect(() => {
    if (!chatId && participantsIds.length > 0) {
      dispatch(createChatOrGetIdAsync());
    }
  }, [chatId, participantsIds]);

  //fetch chat itself
  useEffect(() => {
    if (chatId) dispatch(getChatById(chatId));
  }, [chatId]);

  //update url to chatid
  useEffect(() => {
    const url = `/chats/${chatId?.toString()}`;
    if (chatId !== 0) navigate(url, { replace: true });
  }, [chatId]);

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
    if (msgContent && msgContent.length > 0) dispatch(sendMessageAsync());
    dispatch(setMessageContent(""));
  };

  const handleLike = (messageId: number) => {
    dispatch(toggleLike({ messageId: messageId, userName: userName ?? "" }));
  };

  return (
    <Container
      style={{ backgroundColor: "yellow" }}
      fluid
      className="d-flex flex-column vw-100"
    >
      <h1>Chatname: {chatName ?? membersNicknames[0]}</h1>
      <Row
        style={{ height: "70vh", overflowY: "auto" }}
        className="d-flex flex-column align-items-center justify-content-center w-100 mt-3"
      >
        <Col xs={12} md={8} lg={4} xl={2}>
          <ListGroup className="">
            {messages?.map((message, i) => {
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
            value={msgContent ?? ""}
          />
          <Button onClick={sendMessage}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};
