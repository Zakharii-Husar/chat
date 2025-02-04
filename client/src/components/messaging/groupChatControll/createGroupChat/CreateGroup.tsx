import { useState, useEffect } from "react";
import AddCandidates from "./AddCandidates";
import NewGroupName from "./NewGroupName";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import { resetChatCandidates } from "../../../../redux/slices/createGroupSlice";

import createGroupThunk from "../../../../redux/thunks/createGroupThunk";
import { useRedirectAsync } from "../../../../hooks/useRedirectAsync";
import { Modal, Button, Alert } from "react-bootstrap";
import { FaUsers, FaPlus } from "react-icons/fa6";
import "./CreateGroup.scss";
import CloseButton from '../../../reusable/CloseButton';

const CreateGroup: React.FC = () => {
  const redirectAsync = useRedirectAsync();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const createGroupState = useAppSelector((state) => state.createGroup);

  //reset participants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatCandidates());
    };
  }, []);

  const validateGroup = () => {
    if (!createGroupState.name || createGroupState.name.length < 4) {
      setError("Group name should be at least 4 characters long");
      return false;
    }
    if (createGroupState.candidates.length === 0) {
      setError("Add at least one member to the group");
      return false;
    }
    setError(null);
    return true;
  };

  const createGroup = async () => {
    if (validateGroup()) {
      try {
        await dispatch(createGroupThunk());
        setShowModal(false);
        redirectAsync();
      } catch (error) {
        console.error("Error creating group chat:", error);
        setError("Failed to create group. Please try again.");
      }
    }
  };

  return (
    <div className="create-group">
      <Button
        className="create-group__button"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="icon" />
        <span>New Group</span>
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="create-group__modal"
      >
        <Modal.Header>
          <Modal.Title>
            <FaUsers className="icon" /> Create New Group Chat
          </Modal.Title>
          <CloseButton onClick={() => setShowModal(false)} />
        </Modal.Header>
        <Modal.Body>
          <div className="create-group__content">
            {error && (
              <Alert variant="danger" className="create-group__error">
                {error}
              </Alert>
            )}
            <div className="create-group__top">
              <NewGroupName />
              <Button variant="primary" onClick={createGroup}>
                Create
              </Button>
            </div>
            <div className="create-group__members">
              <AddCandidates />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateGroup;
