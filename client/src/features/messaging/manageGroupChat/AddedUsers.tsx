import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { ListGroup } from "react-bootstrap";
import { removeParticipant } from "../chat/newChatSlice";

const AddedUsers = () => {
  const dispatch = useAppDispatch();
  const newChat = useAppSelector((state) => state.newChat);

  const remove = (index: number) => {
    dispatch(removeParticipant(index));
  };

  return (
    <div className="d-flex flex-wrap mb-3">
      {newChat.participantsUserNames.map((name) => {
        return (
          <ListGroup.Item
            key={name}
            className="d-flex justify-content-between align-items-center"
            style={{
              margin: 0,
              padding: "0.5rem",
              border: "1px solid #dee2e6",
            }}
          >
            <span
              onClick={() =>
                remove(newChat.participantsUserNames.indexOf(name))
              }
            >
              {name} <span style={{ cursor: "pointer" }}>×</span>
            </span>
          </ListGroup.Item>
        );
      })}
    </div>
  );
};

export default AddedUsers;
