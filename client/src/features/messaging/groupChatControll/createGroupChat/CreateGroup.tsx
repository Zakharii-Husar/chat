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

import { resetChatCandidates } from "../../../../state/createGroupSlice";

import createGroupThunk from "../../../../thunks/createGroupThunk";

import { useNavigate } from "react-router";
import useWsReadListener from "../../../../hooks/ws/useWsReadListener";
import { useRedirectAsync } from "../../../../hooks/useRedirectAsync";

const CreateGroup: React.FC = () => {
  const navigate = useNavigate();
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
        const action = await dispatch(createGroupThunk());
        handleShowForm(false);
        redirectAsync();
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }
  };

  return (
    <Card>
      <Card.Header>
        <Button variant="primary" onClick={() => handleShowForm(true)}>
          Create Group Chat
        </Button>
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
  );
};

export default CreateGroup;
