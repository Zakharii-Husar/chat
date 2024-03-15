import { Card, Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../hooks/useAppSelectorAndDispatch";
import { setChatName } from "../chat/newChatSlice";

const GroupName = () => {
  const dispatch = useAppDispatch();

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
  };
  return (
    <div>
      <Form.Group className="mb-3" controlId="chatName">
        <Form.Label>Chat Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter chat name"
          onChange={setName}
        />
      </Form.Group>
    </div>
  );
};

export default GroupName;
