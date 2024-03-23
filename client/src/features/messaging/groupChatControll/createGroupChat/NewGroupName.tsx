import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { setChatName } from "./createGroupSlice";

const NewGroupName: React.FC = () => {
  const dispatch = useAppDispatch();
  const newChatName = useAppSelector((state) => state.createGroup.name);

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
  };


  return (
    <Container>
      <Row>
          <Form.Group className="mb-3" controlId="chatName">
            <Form.Label>Chat Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter chat name"
              value={newChatName ?? ""}
              onChange={setName}
            />
          </Form.Group>
      </Row>
    </Container>
  );
};

export default NewGroupName;
