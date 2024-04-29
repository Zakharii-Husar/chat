import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../../style/_scrollable.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";
import CreateGroup from "../groupChatControll/createGroupChat/CreateGroup";
import getAllChatsThunk from "../../../redux/thunks/getAllChatsThunk";
import ChatBody from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { Link } from "react-router-dom";
import "./ChatsOverview.scss";

export const ChatsOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const chatsOverviewState = useAppSelector((state) => state.chats);
  const hasMore = chatsOverviewState.hasMore;

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center w-100 h-100"
    >
      <CreateGroup />
      <Row className="d-flex justify-content-center h-100">
        <Col className="d-flex h-100">
          <Card className="d-flex w-100">
            <InfiniteScroll
              className="scrollable"
              height={300}
              dataLength={chatsOverviewState?.chats.length}
              next={() => dispatch(getAllChatsThunk())}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<b>Beginning of the chats</b>}
            >
              <Card.Body>
                {chatsOverviewState?.chats?.map((chat) => {
                  const isRead = chat.seenBy.length > 0;
                  return (
                    <Container className="ChatsOverview">
                      <Link
                        key={chat.chatId}
                        to={chat.chatId.toString()}
                        className={
                          "d-flex flex-column justify-content-between mb-2 " +
                          (isRead ? "readChat" : "unreadChat")
                        }
                      >
                        <ChatHeader chat={chat} />
                        <ChatBody message={chat} />
                      </Link>
                    </Container>
                  );
                })}
              </Card.Body>
            </InfiniteScroll>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
