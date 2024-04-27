import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAppDispatch } from "../../../../hooks/useAppSelectorAndDispatch";
import renameChatThunk from "../../../../redux/thunks/renameGroupThunk";
import { useState } from "react";

const RenameGroup: React.FC = () => {
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState<string | null>(null);

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const rename = () => {
    if (newName && newName?.length >= 4 && newName?.length <= 20) {
      dispatch(renameChatThunk(newName));
      setShowForm(false);
    } else {
      alert("Group chat name should be 4-20 characters long!");
    }
  };

  return (
    <Container>
      <Row>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Rename Group"}
        </Button>
      </Row>
      <Row>
        <Collapse in={showForm}>
          <Form.Group className="mb-3" controlId="chatName">
            <Form.Label>Rename Chat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new name"
              value={newName ?? ""}
              onChange={setName}
            />
            <Button onClick={rename}>Rename</Button>
          </Form.Group>
        </Collapse>
      </Row>
    </Container>
  );
};

export default RenameGroup;
