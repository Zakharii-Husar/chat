import Form from "react-bootstrap/Form";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { setChatName } from "../../../../redux/slices/createGroupSlice";
import "./NewGroupName.scss";

const NewGroupName: React.FC = () => {
  const dispatch = useAppDispatch();
  const newChatName = useAppSelector((state) => state.createGroup.name);

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
  };

  return (
    <div className="new-group-name">
      <Form.Control
        type="text"
        placeholder="Enter chat name"
        value={newChatName ?? ""}
        onChange={setName}
        className="new-group-name__input"
      />
    </div>
  );
};

export default NewGroupName;
