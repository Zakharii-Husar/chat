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
import Message from "../Message";

export const ChatsOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const chatsOverviewState = useAppSelector((state) => state.chats);
  const hasMore = chatsOverviewState.hasMore;


  useEffect(() => {
    const initialLoad = () =>{
      if(chatsOverviewState.chats?.length > 1) return;
        dispatch(getAllChatsThunk());
    }
    initialLoad();
  }, []);


  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <CreateGroup />
      <MDBRow className="d-flex w-100 justify-content-center">
        <MDBCol className="d-flex w-100">
          <MDBCard className="d-flex w-100">
            <InfiniteScroll
              className="scrollable flex-column"
              height={300}
              dataLength={chatsOverviewState?.chats.length}
              next={()=>dispatch(getAllChatsThunk())}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Beginning of the chats</b>
                </p>
              }
            >
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  {chatsOverviewState?.chats?.map((chat) => {
                    return (<Message message={chat}/>);
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
