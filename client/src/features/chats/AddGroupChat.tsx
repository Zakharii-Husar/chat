import { useState, useEffect } from "react";
import {
  Card,
  Modal,
  Button,
  Form,
  InputGroup,
  ListGroup,
  FormControl,
} from "react-bootstrap";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import {
  fetchAllUsersAsync,
  searchUsers,
  updateSearchedUser,
} from "../users/usersSlice";

const AddGroupChat = () => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(!showForm);
  const dispatch = useAppDispatch();
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    console.log(filteredUsers);
  }, [console.log]);
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, []);

  useEffect(() => {
    if (searchedUser) dispatch(searchUsers(searchedUser));
  }, [searchedUser]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const currentList = searchedUser ? filteredUsers : allUsers;

  return (
    <Card>
      <Card.Header>
        <Button variant="primary" onClick={handleShowForm}>
          Add Group Chat
        </Button>
      </Card.Header>

      <Modal show={showForm} onHide={handleShowForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap mb-3">
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center"
              style={{
                margin: 0,
                padding: "0.5rem",
                border: "1px solid #dee2e6",
              }}
            >
              <span>
                User 1 <span style={{ cursor: "pointer" }}>×</span>
              </span>
            </ListGroup.Item>
          </div>
          <Form>
            <InputGroup className="mb-3">
              <FormControl placeholder="Search users" onInput={search} />
            </InputGroup>

            {currentList.map((user) => {
              return (
                <Form.Group key={user.id}>
                  <ListGroup.Item>{user.nickname}</ListGroup.Item>
                </Form.Group>
              );
            })}

            <Form.Group className="mb-3" controlId="chatName">
              <Form.Label>Chat Name</Form.Label>
              <Form.Control type="text" placeholder="Enter chat name" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Group Chat
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default AddGroupChat;
