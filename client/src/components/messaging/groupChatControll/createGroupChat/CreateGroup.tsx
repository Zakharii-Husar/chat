import { useState, useEffect } from "react";
import RemoveCandidates from "./RemoveCandidates";
import AddCandidates from "./AddCandidates";
import NewGroupName from "./NewGroupName";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import { resetChatCandidates } from "../../../../redux/slices/createGroupSlice";

import createGroupThunk from "../../../../redux/thunks/createGroupThunk";
import { useRedirectAsync } from "../../../../hooks/useRedirectAsync";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";
import { FaUserGroup } from "react-icons/fa6";

const CreateGroup: React.FC = () => {
  const redirectAsync = useRedirectAsync();
  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();
  const createGroupState = useAppSelector((state) => state.createGroup);

  //reset participants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatCandidates());
    };
  }, []);

  const handleShowForm = (status: boolean) => {
    setShowForm(status);
  };

  const createGroup = async () => {
    if (!createGroupState.name || createGroupState.name.length < 4) {
      alert("Provide at least 4 characters long chat name!");
    } else {
      try {
        await dispatch(createGroupThunk());
        handleShowForm(false);
        redirectAsync();
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col>
        <Card>
          <Card.Header
            className="w-100 badge text-bg-primary text-wrap h-5"
            role="button"
            onClick={() => handleShowForm(true)}
          >
            <span className="me-2">Create Group Chat</span>
            <FaUserGroup/>
          </Card.Header>

          <Modal show={showForm} onHide={() => handleShowForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create Group Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RemoveCandidates />
              <AddCandidates />
              <NewGroupName />
              <Button variant="primary" onClick={createGroup}>
                Create Group Chat
              </Button>
            </Modal.Body>
          </Modal>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateGroup;
