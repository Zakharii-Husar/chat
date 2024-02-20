import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { fetchAChat } from "./chatSlice";
import { useFindUserById } from "../../hooks/useFindUserById";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export const Chat: React.FC = () => {

    let { state } = useLocation();
    const findUser = useFindUserById();
    const dispatch = useAppDispatch();
    const { chatId } = useParams();

    console.log(state.recieverId);

    const { id: loggedInUserId } = useAppSelector(state => state.auth.response);



    const {
        chat,
        loading,
        error } = useAppSelector(state => state.chat);


    useEffect(() => {
        dispatch(fetchAChat(chatId ?? "0"));
    }, [dispatch])

    const reversedChat = [...chat].reverse();


    return (
        <Container style={{ backgroundColor: "yellow" }}
            fluid className="d-flex flex-column vw-100">
            <Row style={{ height: '70vh', overflowY: 'auto' }}
                className="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
                <Col xs={12} md={8} lg={4} xl={2}>
                    {loading === 'pending' && <p>Loading...</p>}
                    {loading === 'failed' && <p>Error: {error}</p>}

                    {loading === 'succeeded' && (
                        <ListGroup className="">
                            {reversedChat?.map((message, i) => {
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
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Type message..."
                    />
                </Col>
            </Row>
        </Container>)

}