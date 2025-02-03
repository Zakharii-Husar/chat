import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppSelectorAndDispatch";
import Confirmation from "../../../reusable/Confirmation";
import rmChatMemberThunk from "../../../../redux/thunks/rmChatMemberThunk";
import { Button } from "react-bootstrap";

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
        titleText="Do you wanna leave this group?"
        proceed={() => leave()}
      >
        <Button className="w-100">
          Leave group
        </Button>
      </Confirmation>
    </div>
  );
};

export default LeaveGroup;
