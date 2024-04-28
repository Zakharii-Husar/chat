import { useState, useEffect } from "react";
import RemoveCandidates from "./RemoveCandidates";
import AddCandidates from "./AddCandidates";
import NewGroupName from "./NewGroupName";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import { resetChatCandidates } from "../../../../redux/slices/createGroupSlice";

import createGroupThunk from "../../../../redux/thunks/createGroupThunk";
import { useRedirectAsync } from "../../../../hooks/useRedirectAsync";
import { Row, Col } from "react-bootstrap";

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
      <Col xs={12} sm={10} lg={8} xl={6}>
        <Card>
          <Card.Header className="badge text-bg-primary text-wrap h-5" role="button" onClick={() => handleShowForm(true)}>
            Create Group Chat
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
