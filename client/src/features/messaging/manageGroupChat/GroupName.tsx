import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";
import { setChatName } from "../chat/newChatSlice";
import { useEffect, useState } from "react";

const GroupName: React.FC<{ isNewGroup: boolean }> = ({ isNewGroup }) => {
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  const newChatName = useAppSelector((state) => state.newChat.chatName);
  const existingChatName = useAppSelector(
    (state) => state.existingChat.chatName
  );

  useEffect(() => {
    //if(!isNewGroup && existingChatName)
    setChatName("sass");
  }, []);

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
  };
  return (
    <Container>
      <Row className={"d-" + isNewGroup ? "none" : "flex"}>
        <Button onClick={()=>setShowForm(!showForm)}>Rename Group</Button>
      </Row>
      <Row>
        <Collapse in={showForm || isNewGroup}>
          <Form.Group className="mb-3" controlId="chatName">
            <Form.Label>Chat Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter chat name"
              value={newChatName ?? ""}
              onChange={setName}
            />
          </Form.Group>
        </Collapse>
      </Row>
    </Container>
  );
};

export default GroupName;
