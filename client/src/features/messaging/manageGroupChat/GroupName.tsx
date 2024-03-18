import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useAppSelectorAndDispatch";
import { setChatName } from "../chat/newChatSlice";
import { renameChat } from "../chat/existingChatSlice";
import { useEffect, useState } from "react";

const GroupName: React.FC<{ isNewGroup: boolean }> = ({ isNewGroup }) => {
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  const newChatName = useAppSelector((state) => state.newChat.chatName);
  const existingChatName = useAppSelector(
    (state) => state.existingChat.chatName
  );

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
  };

  const rename = () => {
    if (newChatName && newChatName?.length >= 4 && newChatName?.length <= 20) {
      dispatch(renameChat());
      setShowForm(false);
    } else {
      alert("Group chat name should be 4-20 characters long!");
    }
  };

  return (
    <Container>
      {!isNewGroup && (
        <Row className={"d-" + isNewGroup ? "none" : "flex"}>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Rename Group"}</Button>
        </Row>
      )}
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
            {!isNewGroup && <Button onClick={rename}>Rename</Button>}
          </Form.Group>
        </Collapse>
      </Row>
    </Container>
  );
};

export default GroupName;
