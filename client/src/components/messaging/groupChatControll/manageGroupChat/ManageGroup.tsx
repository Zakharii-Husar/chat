import { useState } from "react";
import RemoveMembers from "./RemoveMembers";
import AddMembers from "./AddMembers";
import RenameGroup from "./RenameGroup";
import LeaveGroup from "./LeaveGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaEllipsisV } from "react-icons/fa";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";
import "./ManageGroup.scss";

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
          <LeaveGroup />
          <RemoveMembers />
          <AddMembers />
          <RenameGroup />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageGroupChat;
