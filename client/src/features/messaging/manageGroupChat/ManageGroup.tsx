import { useState, useEffect } from "react";
import RemoveUsers from "./RemoveUsers";
import AddUsers from "./AddUsers";
import GroupName from "./GroupName";

import { Card, Modal, Button } from "react-bootstrap";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";

import {
  createGroupChat,
  addChatCandidats,
  resetChatCandidats,
  setChatName,
} from "../chat/newChatSlice";

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
      dispatch(resetChatCandidats());
    };
  }, []);

  const handleShowForm = (status: boolean) => {
    dispatch(resetChatCandidats());
    setShowForm(status);
  };

  const createGroup = async () => {
    if (!newChat.chatName || newChat.chatName.length < 4) {
      alert("Provide at least 3 characters long chat name!");
    } else {
      try {
        const action = await dispatch(createGroupChat());
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
            <RemoveUsers isNewGroup={isNewGroup} />
          <AddUsers isNewGroup={isNewGroup} />
          <GroupName />

          <Button className={"d-" + (isNewGroup ? "flex" : "none")} variant="primary" onClick={createGroup}>
            Create Group Chat
          </Button>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ManageGroupChat;
