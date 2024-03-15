import { useState, useEffect } from "react";
import AddedUsers from "./AddedUsers";
import SearchUsers from "./SearchUsers";
import GroupName from "./GroupName";

import { Card, Modal, Button } from "react-bootstrap";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";

import {
  createChatOrGetIdAsync,
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

  const createdGroupId = useAppSelector((state) => state.existingChat.id);

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

  const createGroup = () => {
    if (!newChat.chatName || newChat.chatName.length < 4) {
      alert("Provide at least 3 characters long chat name!");
    } else {
      dispatch(createChatOrGetIdAsync()).then(() => {
        navigate("/chats/" + createdGroupId?.toString(), {
          state: { chatId: createdGroupId },
        });
      });
    }
  };

  return (
    <Card>
      <Card.Header>
        <Button variant="primary" onClick={()=>handleShowForm(true)}>
          {isNewGroup ? "Add Group Chat" : "Manage Group Chat"}
        </Button>
      </Card.Header>

      <Modal show={showForm} onHide={()=>handleShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddedUsers isNewChat={isNewGroup}/>
          <SearchUsers />
          <GroupName />
          <Button variant="primary" onClick={createGroup}>
            Create Group Chat
          </Button>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ManageGroupChat;
