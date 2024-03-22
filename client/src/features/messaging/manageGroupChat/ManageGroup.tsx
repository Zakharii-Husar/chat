import { useState, useEffect } from "react";
import RemoveMembers from "./RemoveMembers";
import AddMembers from "./AddMembers";
import RenameGroup from "./RenameGroup";
import LeaveGroup from "./LeaveGroup";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";

import { resetChatCandidates } from "../chat/newChatSlice";

import createGroupThunk from "../chat/newChatThunks/createGroupThunk";

import { useNavigate } from "react-router";

const ManageGroupChat: React.FC<{ isNewGroup: boolean }> = ({ isNewGroup }) => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();
  const newChat = useAppSelector((state) => state.newChat);
  const existingChat = useAppSelector((state) => state.existingChat);

  //reset participants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatCandidates());
    };
  }, []);

  const handleShowForm = (status: boolean) => {
    dispatch(resetChatCandidates());
    setShowForm(status);
  };

  const createGroup = async () => {
    if (!newChat.chatName || newChat.chatName.length < 4) {
      alert("Provide at least 3 characters long chat name!");
    } else {
      try {
        const action = await dispatch(createGroupThunk());
        const chatId = action.payload;

        navigate("/chats/" + chatId);
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }
  };

  return (
    <Card>
      <Card.Header>
        <Button variant="primary" onClick={() => handleShowForm(true)}>
          {isNewGroup ? "Add Group Chat" : "Manage Group Chat"}
        </Button>
      </Card.Header>

      <Modal show={showForm} onHide={() => handleShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNewGroup ? "Add Group Chat" : existingChat.chatName}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveGroup/>
          <RemoveMembers />
          <AddMembers  />
          <RenameGroup />
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ManageGroupChat;
