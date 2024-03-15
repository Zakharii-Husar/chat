import { useState, useEffect } from "react";
import AddedUsers from "./AddedUsers";
import SearchUsers from "./SearchUsers";
import {
  Card,
  Modal,
  Button,
  Form
} from "react-bootstrap";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import {
  fetchAllUsersAsync,
  searchUsers,
  updateSearchedUser,
} from "../../users/usersSlice";

import {
  createChatOrGetIdAsync,
  addChatParticipants,
  resetChatParticipants,
  setChatName,
} from "../chat/newChatSlice";

import { useNavigate } from "react-router";

const ManageGroupChat: React.FC<{ isNewChat: boolean }> = ({ isNewChat }) => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();

  const newChat = useAppSelector((state) => state.newChat);

  const createdGroupId = useAppSelector((state) => state.existingChat.id);

  

  //reset participants on exit
  useEffect(() => {
    return () => {
      dispatch(resetChatParticipants());
    };
  }, []);

  const handleShowForm = () => {
    dispatch(resetChatParticipants());
    setShowForm(!showForm);
  };


  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
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
        <Button variant="primary" onClick={handleShowForm}>
          {isNewChat ? "Add Group Chat" : "Manage Group Chat"}
        </Button>
      </Card.Header>

      <Modal show={showForm} onHide={handleShowForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddedUsers />
          <SearchUsers/>

          <Form.Group className="mb-3" controlId="chatName">
            <Form.Label>Chat Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter chat name"
              onChange={setName}
            />
          </Form.Group>

          <Button variant="primary" onClick={createGroup}>
            Create Group Chat
          </Button>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ManageGroupChat;
