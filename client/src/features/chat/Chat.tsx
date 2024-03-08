import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { getChatById, setMessageContent, sendMessageAsync, getChatIdAsync, setCurrentChatId } from "./chatSlice";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

export const Chat: React.FC = () => {

    const { state: locationState } = useLocation();
    const recipientId = locationState?.recipientId;
    const locationStateChatId = locationState?.chatId;

    const { id: loggedInUserId } = useAppSelector(state => state.auth.response);
    const dispatch = useAppDispatch();
const navigate = useNavigate();

    const { friendNickname } = useParams();

    const { Content: msgContent } = useAppSelector(state => state.chat.messageToSend);

    const chatId = useAppSelector(state => state.chat.chatId);



    const { chat } = useAppSelector(state => state.chat);

    //set chatId if present
    useEffect(()=>{
        dispatch(setCurrentChatId(locationStateChatId));
    }, [locationStateChatId])


    //fetch chat id
    useEffect(()=>{
        if (chatId === 0 && recipientId !== null){
            dispatch(getChatIdAsync([recipientId, loggedInUserId]))
        }else{
            dispatch(getChatById(chatId));
        }
    }, [recipientId])

    //update url to chatid
    useEffect(()=>{
        const url = `/chats/${chatId?.toString()}`;
        if(chatId !== 0) navigate(url, { replace: true });

    }, [chatId])
    
    //reset currentChatId on exit
    useEffect(()=>{
        return(()=>{
            dispatch(setCurrentChatId(0));
            })
    }, [])


    const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessageContent(e.target.value))
    };

    const sendMessage = () => {
        if(msgContent && msgContent.length > 0)dispatch(sendMessageAsync());
        dispatch(setMessageContent(""));
    }


    return (
        <Container style={{ backgroundColor: "yellow" }}
            fluid className="d-flex flex-column vw-100">
            <Row style={{ height: '70vh', overflowY: 'auto' }}
                className="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
                <Col xs={12} md={8} lg={4} xl={2}>


                    <ListGroup className="">
                        {chat?.map((message, i) => {
                            const alignSelf = `align-self-${message.senderId === loggedInUserId ?
                                "end" : "start"}`
                            return (
                                <ListGroup.Item style={{ backgroundColor: "blue" }} key={message.messageId || i}
                                    className={`d-flex flex-column ${alignSelf}
                                     align-items-start justify-content-between py-1
                                      w-50`}>
                                    <div className="d-flex flex-column w-100">
                                        <p>{message.content}</p>
                                        <p style={{ backgroundColor: "grey" }} className={`d-flex ${alignSelf}`}>{message.sentAt}</p>
                                    </div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control
                        onChange={handleMessageInput}
                        type="text"
                        placeholder="Type message..."
                        value={msgContent ?? ""}
                    />
                    <Button onClick={sendMessage}>
                        Send
                    </Button>
                </Col>
            </Row>
        </Container>)

}