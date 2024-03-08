import { fetchAllChats } from "./chatsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export const Chats: React.FC = () => {

    const dispatch = useAppDispatch();
    const allChats = useAppSelector(state => state.chats);


    useEffect(() => {
        dispatch(fetchAllChats());
        
    }, [])

    useEffect(()=>{
        console.log(allChats)
    }, [allChats])

    return (
        <>
            <h1>Chats</h1>
            <div>
                {allChats.map((chat, i) => {
                    return (
                        <ul key={i}>
                            <Link to={chat.chatId.toString()} state={{ chatId: chat.chatId }}>
                                <li>{chat.userName}</li>
                                <li>{chat.content}</li>
                                <li>{chat.sentAt}</li>
                            </Link>
                        </ul>
                    )
                })
                }
            </div>
        </>)
}