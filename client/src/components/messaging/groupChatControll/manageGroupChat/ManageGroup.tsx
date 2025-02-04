import { useState } from "react";
import RenameGroup from "./RenameGroup";
import LeaveGroup from "./LeaveGroup";
import { Modal, Button } from "react-bootstrap";
import { 
  FiSettings, 
  FiUsers, 
  FiX 
} from "react-icons/fi";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import "./ManageGroup.scss";
import ManageMembers from "./ManageMembers";
import CloseButton from '../../../reusable/CloseButton';

const ManageGroupChat: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const isStillMember = currentChat.members.some(
    (member) => member.id === currentUser.id
  );

  if (!isStillMember) return null;

  return (
    <div className="manage-group">
      <Button 
        variant="link" 
        className="manage-group__button"
        onClick={() => setShowForm(true)}
        title="Manage Group"
      >
        <FiSettings />
      </Button>

      <Modal 
        show={showForm} 
        onHide={() => setShowForm(false)}
        className="manage-group__modal"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="manage-group__title">
            <FiUsers className="manage-group__title-icon" />
            <span>{currentChat.chatName}</span>
          </Modal.Title>
          <CloseButton onClick={() => setShowForm(false)} />
        </Modal.Header>
        <Modal.Body className="manage-group__body">
          <div className="manage-group__content">
            <div className="manage-group__actions">
              <RenameGroup />
              <LeaveGroup />
            </div>
            <div className="manage-group__members-section">
              <ManageMembers />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageGroupChat;
