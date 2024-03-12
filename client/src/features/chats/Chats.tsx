import { MDBBadge, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { fetchAllChats } from "./chatsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddGroupChat from "./AddGroupChat";

export function Chats() {
  const dispatch = useAppDispatch();
  const allChats = useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchAllChats());
  }, []);
  
  return (
    <MDBListGroup style={{ minWidth: "22rem" }} light>
        <AddGroupChat/>
      {allChats.map((chat) => {
        return (
          <MDBListGroupItem
            key={chat.chatId}
            className="d-flex justify-content-between align-items-center"
          >
            <Link to={chat.chatId.toString()} state={{ chatId: chat.chatId }}>
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">{chat.chatName}</p>
                  <p className="text-muted mb-0">{chat.content}</p>
                </div>
              </div>
              <MDBBadge pill light color="success">
                Active
              </MDBBadge>
            </Link>
          </MDBListGroupItem>
        );
      })}
    </MDBListGroup>
  );
}
// import ListGroup from 'react-bootstrap/ListGroup';
// import { fetchAllChats } from "./chatsSlice";
// import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import AddGroupChat from './AddGroupChat';

// export const Chats: React.FC = () => {

//     const dispatch = useAppDispatch();
//     const allChats = useAppSelector(state => state.chats);

//     useEffect(() => {
//         dispatch(fetchAllChats());

//     }, [])

//     return (
//         <>
//             <h1>Chats</h1>
//             <AddGroupChat/>
//             <div className="list-group-info">
//                 {allChats.map((chat, i) => {
//                     return (

//                         <ListGroup key={i} variant="info">
//                             <Link  to={chat.chatId.toString()} state={{ chatId: chat.chatId }}>
//                                  <ListGroup.Item >{chat.chatName}</ListGroup.Item>
//                                  <ListGroup.Item>{chat.content}</ListGroup.Item>
//                                  <ListGroup.Item>{chat.sentAt}</ListGroup.Item>
//                             </Link>
//                         </ListGroup>
//                     )
//                 })
//                 }
//             </div>
//         </>)
//
