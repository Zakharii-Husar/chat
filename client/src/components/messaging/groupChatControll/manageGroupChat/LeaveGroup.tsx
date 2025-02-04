import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppSelectorAndDispatch";
import Confirmation from "../../../reusable/Confirmation";
import rmChatMemberThunk from "../../../../redux/thunks/rmChatMemberThunk";
import { Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";

const LeaveGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const leave = () => {
    if (currentUser.userName) {
      dispatch(rmChatMemberThunk(currentUser.userName));
    }
  };

  return (
    <div className="mb-3 w-100">
      <Confirmation
        titleText="Do you want to leave this group?"
        proceed={() => leave()}
      >
        <Button variant="danger" className="d-flex align-items-center gap-2">
          <FaSignOutAlt />
          Leave Group
        </Button>
      </Confirmation>
    </div>
  );
};

export default LeaveGroup;
