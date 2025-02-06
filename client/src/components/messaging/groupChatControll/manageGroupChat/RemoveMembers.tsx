import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import Confirmation from "../../../reusable/Confirmation";
import { ListGroup, Button } from "react-bootstrap";
import { FaUserMinus } from "react-icons/fa";
import { useState } from "react";
import rmChatMemberThunk from "../../../../redux/thunks/rmChatMemberThunk";
import "./RemoveMembers.scss";

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
        variant="primary"
        onClick={() => setShowList(!showList)}
        className="d-flex align-items-center gap-2"
      >
        <FaUserMinus />
        {showList ? 'Cancel' : 'Remove Members'}
      </Button>

      {showList && (
        <div className="remove-members__content">
          <div className="remove-members__list">
            <ListGroup className="scrollable">
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
                      <Button variant="link" size="sm" className="remove-members__action">
                        <FaUserMinus />
                      </Button>
                    </Confirmation>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveMembers;
