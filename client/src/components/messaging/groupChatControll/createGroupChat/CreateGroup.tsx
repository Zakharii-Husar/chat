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
import { Modal, Button } from "react-bootstrap";
import { FaUsers, FaPlus } from "react-icons/fa6";
import "./CreateGroup.scss";

const CreateGroup: React.FC = () => {
  const redirectAsync = useRedirectAsync();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const createGroupState = useAppSelector((state) => state.createGroup);

  //reset participants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatCandidates());
    };
  }, []);

  const createGroup = async () => {
    if (!createGroupState.name || createGroupState.name.length < 4) {
      alert("Provide at least 4 characters long chat name!");
    } else {
      try {
        await dispatch(createGroupThunk());
        setShowModal(false);
        redirectAsync();
      } catch (error) {
        console.error("Error creating group chat:", error);
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
        <Modal.Header closeButton>
          <Modal.Title>
            <FaUsers className="icon" /> Create New Group Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-group__content">
            <div className="create-group__top">
              <NewGroupName />
              <Button variant="primary" onClick={createGroup}>
                Create Group Chat
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
