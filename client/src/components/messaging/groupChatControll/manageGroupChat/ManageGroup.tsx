import { useState } from "react";
import RenameGroup from "./RenameGroup";
import LeaveGroup from "./LeaveGroup";
import { Modal, Button } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import "./ManageGroup.scss";
import ManageMembers from "./ManageMembers";
const ManageGroupChat: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const currentChat = useAppSelector((state) => state.currentChat);

  return (
    <div className="manage-group">
      <Button 
        variant="link" 
        className="manage-group__button"
        onClick={() => setShowForm(true)}
      >
        <FaEllipsisV />
      </Button>

      <Modal 
        show={showForm} 
        onHide={() => setShowForm(false)}
        className="manage-group__modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="manage-group__title">
            {currentChat.chatName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="manage-group__body">
          <div className="manage-group__content">
            <RenameGroup />
            <div className="manage-group__members-section">
              <ManageMembers />
            </div>
            <LeaveGroup />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageGroupChat;
