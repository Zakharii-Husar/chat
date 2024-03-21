import { formatDistanceToNow } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Chats.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { fetchAllChats } from "./chatsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ManageGroupChat from "../manageGroupChat/ManageGroup";

export function Chats() {
  const dispatch = useAppDispatch();
  const chatsOverviewState = useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchAllChats());
  }, []);

  useEffect(()=>{
    console.log(chatsOverviewState);
  }, [chatsOverviewState])

  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <ManageGroupChat isNewGroup={true} />
      <MDBRow className="d-flex w-100 justify-content-center">
        <MDBCol className="d-flex w-100">
          <MDBCard className="d-flex w-100">
            <InfiniteScroll
              className="chatsScroll"
              height={300}
              dataLength={chatsOverviewState.chats.length}
              next={() => {
                if (!chatsOverviewState.isLoading) dispatch(fetchAllChats());
              }}
              hasMore={chatsOverviewState.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Beginning of the chats</b>
                </p>
              }
            >
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  {chatsOverviewState.chats.map((chat) => {
                    const time = getTimeAgo(chat.sentAt);
                    return (
                      <li className="p-2" key={chat.chatId}>
                        <Link
                          to={chat.chatId.toString()}
                          className="d-flex justify-content-between"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{chat.chatName}</p>
                              <p className="small text-muted">
                                {chat.content.substring(0, 10) + "..."}
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">{time}</p>
                            <span className="text-muted float-end">
                              <MDBIcon fas icon="check" />
                            </span>
                          </div>
                        </Link>
                      </li>
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
}
