import { useState } from "react";
import RemoveMembers from "./RemoveMembers";
import AddMembers from "./AddMembers";
import RenameGroup from "./RenameGroup";
import LeaveGroup from "./LeaveGroup";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";

const ManageGroupChat: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const currentChat = useAppSelector((state) => state.currentChat);

  const handleShowForm = (status: boolean) => {
    setShowForm(status);
  };

  return (
    <Card>
      <Card.Header>
        <Button variant="primary" onClick={() => handleShowForm(true)}>
          Manage Group Chat"
        </Button>
      </Card.Header>

      <Modal show={showForm} onHide={() => handleShowForm(false)}>
        <Modal.Header closeButton className="text-primary">
          <Modal.Title>
            {currentChat.chatName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveGroup />
          <RemoveMembers />
          <AddMembers />
          <RenameGroup />
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ManageGroupChat;
