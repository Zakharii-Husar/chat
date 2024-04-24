import InfiniteScroll from "react-infinite-scroll-component";
import "../../../style/scrollable.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import CreateGroup from "../groupChatControll/createGroupChat/CreateGroup";
import getAllChatsThunk from "../../../thunks/getAllChatsThunk";
import ChatBody from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { Link } from "react-router-dom";

export const ChatsOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const chatsOverviewState = useAppSelector((state) => state.chats);
  const hasMore = chatsOverviewState.hasMore;

  useEffect(() => {
    const initialLoad = () => {
      if (chatsOverviewState.chats?.length > 1) return;
      dispatch(getAllChatsThunk());
    };
    initialLoad();
  }, []);

  return (
    <MDBContainer
      fluid
      className="d-flex flex-column justify-content-center w-100 h-100"
    >
      <CreateGroup />
      <MDBRow className="d-flex justify-content-center h-100">
        <MDBCol xs={12} sm={10} lg={8} xl={6} className="d-flex h-100">
          <MDBCard className="d-flex w-100">
            <InfiniteScroll
              style={{ height: "80vh" }}
              className="scrollable flex-column"
              height={300}
              dataLength={chatsOverviewState?.chats.length}
              next={() => dispatch(getAllChatsThunk())}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Beginning of the chats</b>
                </p>
              }
            >
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0 w-100">
                  {chatsOverviewState?.chats?.map((chat) => {
                    const isRead = chat.seenBy.length > 0;
                    return (
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          backgroundColor: isRead ? "" : "#f5f5f5",
                        }}
                        key={chat.chatId}
                        to={chat.chatId.toString()}
                        className="d-flex flex-column justify-content-between mb-2"
                      >
                        <ChatHeader chat={chat} />
                        <ChatBody message={chat} />
                      </Link>
                    );
                  })}
                </MDBTypography>
              </MDBCardBody>
            </InfiniteScroll>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
