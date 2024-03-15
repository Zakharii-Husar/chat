import React from "react";
import { formatDistanceToNow } from 'date-fns';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
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
  const allChats = useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchAllChats());
  }, []);

  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <MDBContainer className="py-5" style={{ backgroundColor: "#eee" }}>
      <ManageGroupChat isNewChat={true}/>
      <MDBRow>
        <MDBCol className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {allChats.map((chat) => {
                  const time = getTimeAgo(chat.sentAt);
                  return (
                    <li className="p-2" key={chat.chatId}>
                      <Link to={chat.chatId.toString()} state={{ chatId: chat.chatId }} className="d-flex justify-content-between">
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
                            { chat.content.substring(0, 10) + "..."}
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
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
