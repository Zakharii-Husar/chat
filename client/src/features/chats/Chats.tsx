import { fetchAllChats } from "./chatsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFindUserById } from "../../hooks/useFindUserById";


export const Chats: React.FC = () => {

    const findUser = useFindUserById();
    const dispatch = useAppDispatch();

    const {
        chats,
        loading,
        error } = useAppSelector(state => state.chats);

    const loggedInUserId = 1;


    useEffect(() => {
        dispatch(fetchAllChats());
    }, [dispatch])

    return (
        <>
            <h1>Chats</h1>
            <div>
                {chats.map((chat, i) => {
                    return (
                        <ul key={i}>
                            <Link to={i.toString()}>
                                <li><h1>{
                                    chat[0].sender !== loggedInUserId ?
                                        findUser(chat[0].sender)?.nickName :
                                        findUser(chat[0].reciever)?.nickName
                                }</h1></li>
                                <li>{chat[0].content}</li>
                            </Link>
                        </ul>
                    )
                })
                }
            </div>
        </>)
}