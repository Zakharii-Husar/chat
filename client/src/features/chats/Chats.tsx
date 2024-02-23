import { fetchAllChats } from "./chatsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export const Chats: React.FC = () => {

    const dispatch = useAppDispatch();

    const {
        chats,
        loading,
        error } = useAppSelector(state => state.chats);

    const loggedInUserId = "1";


    useEffect(() => {
        dispatch(fetchAllChats());
    }, [dispatch])

    return (
        <>
            <h1>Chats</h1>
            <div>
                {/*{chats.map((chat, i) => {*/}
                {/*    return (*/}
                {/*        <ul key={i}>*/}
                {/*            <Link to={i.toString()}>*/}
                {/*                <li>*/}
                {/*                <li>{chat[0].content}</li>*/}
                {/*            </Link>*/}
                {/*        </ul>*/}
                {/*    )*/}
                {/*})*/}
                {/*}*/}
            </div>
        </>)
}