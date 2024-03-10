import ListGroup from 'react-bootstrap/ListGroup';
import { fetchAllChats } from "./chatsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddGroupChat from './AddGroupChat';

export const Chats: React.FC = () => {

    const dispatch = useAppDispatch();
    const allChats = useAppSelector(state => state.chats);


    useEffect(() => {
        dispatch(fetchAllChats());
        
    }, [])


    return (
        <>
            <h1>Chats</h1>
            <AddGroupChat/>
            <div className="list-group-info">
                {allChats.map((chat, i) => {
                    console.log(chat.chatName);
                    return (
                        
                        <ListGroup key={i} variant="info">
                            <Link  to={chat.chatId.toString()} state={{ chatId: chat.chatId }}>
                                 <ListGroup.Item >{chat.chatName}</ListGroup.Item>
                                 <ListGroup.Item>{chat.content}</ListGroup.Item>
                                 <ListGroup.Item>{chat.sentAt}</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    )
                })
                }
            </div>
        </>)
}