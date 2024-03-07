import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { fetchAChat, setMessageContent, sendMessageAsync, getChatIdAsync, setCurrentChatId } from "./chatSlice";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { channel } from "diagnostics_channel";

export const Chat: React.FC = () => {

    const { state: locationState } = useLocation();
    const recipientId = locationState?.recipientId;

    const { id: loggedInUserId } = useAppSelector(state => state.auth.response);
    const dispatch = useAppDispatch();
const navigate = useNavigate();

    const { friendNickname } = useParams();

    const { Content } = useAppSelector(state => state.chat.messageToSend);

    const chatId = useAppSelector(state => state.chat.chatId);



    const { chat } = useAppSelector(state => state.chat);

    //GETTING EXISTING MESSAGES & SETTING MESSAGE RECIEVER
    // useEffect(() => {
    //     if (recipientId) {
    //         dispatch(setRecieverId(recipientId));
    //         dispatch(fetchAChat(recipientId));
    //         console.log(chat);
    //     }
    // }, [dispatch, recipientId])


    //fetch chat id
    useEffect(()=>{
        if (chatId === 0 && recipientId !== null){
            dispatch(getChatIdAsync([recipientId, loggedInUserId]));
        }
    }, [recipientId])

    //update url to chatid
    useEffect(()=>{
        const url = `/chats/${chatId.toString()}`;
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
        dispatch(sendMessageAsync());
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
                                <ListGroup.Item style={{ backgroundColor: "blue" }} key={message.id}
                                    className={`d-flex flex-column ${alignSelf}
                                     align-items-start justify-content-between py-1
                                      w-50`}>
                                    <div className="d-flex flex-column w-100">
                                        <p>{message.content}</p>
                                        <p style={{ backgroundColor: "grey" }} className={`d-flex ${alignSelf}`}>{message.time}</p>
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
                    />
                    <Button onClick={sendMessage}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>)

}