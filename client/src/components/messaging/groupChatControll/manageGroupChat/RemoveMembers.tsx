import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { rmMemberByUname } from "../../../../redux/slices/currentChatSlice";
import Confirmation from "../../../reusable/Confirmation";
import { ListGroup, Button, Collapse } from "react-bootstrap";
import { useState } from "react";
import rmChatMemberThunk from "../../../../redux/thunks/rmChatMemberThunk";

const RemoveMembers: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const isCreator = currentUserId === currentChat.adminId;
  const [showList, setShowList] = useState(false);

  const remove = async (userName: string) => {
    await dispatch(rmChatMemberThunk(userName));
    // Local state update will be handled by SignalR
  };

  if (!isCreator) return null;

  return (
    <div className="remove-members">
      <Button 
        variant="danger"
        onClick={() => setShowList(!showList)}
        className="remove-members__toggle"
      >
        {showList ? "Cancel" : "Remove Members"}
      </Button>

      <Collapse in={showList}>
        <div className="remove-members__list">
          {currentChat.members.map((member) => {
            if (member.id === currentUserId) return null;
            
            return (
              <ListGroup.Item
                key={member.id}
                className="remove-members__item"
              >
                <span>{member.userName}</span>
                <Confirmation
                  titleText={`Remove ${member.userName} from the chat?`}
                  proceed={() => remove(member.userName!)}
                >
                  <Button variant="outline-danger" size="sm">Remove</Button>
                </Confirmation>
              </ListGroup.Item>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default RemoveMembers;
