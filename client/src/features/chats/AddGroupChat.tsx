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

import {
  createChatOrGetIdAsync,
  addChatParticipants,
  removeParticipant,
  resetChatParticipants,
  setChatName
} from "../chat/newChatSlice";

const AddGroupChat = () => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () =>{
    dispatch(resetChatParticipants());
    setShowForm(!showForm);
  } ;

  const dispatch = useAppDispatch();
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  const { participantsIds, participantsUserNames, chatName } = useAppSelector(
    (state) => state.newChat
  );

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, []);

  useEffect(() => {
    if (searchedUser) dispatch(searchUsers(searchedUser));
  }, [searchedUser]);

  //reset participants on exit
  useEffect(()=>{
    return(()=>{
      dispatch(resetChatParticipants());
    })
  }, [])

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const addParticipant = (id: string, userName: string) => {
    dispatch(addChatParticipants({id: id, name: userName}));
  };

  const remove = (index: number) =>{
    dispatch(removeParticipant(index));
  };

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setChatName(e.target.value));
  };

  const createGroup = () => {
    if (!chatName || chatName.length < 4){
      alert("Provide at least 3 characters long chat name!");
    }else{
      dispatch(createChatOrGetIdAsync());
    }
  }

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
            {participantsUserNames.map((name) => {
              return (
                <ListGroup.Item
                  key={name}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    margin: 0,
                    padding: "0.5rem",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <span onClick={()=> remove(participantsUserNames.indexOf(name))}>
                    {name} <span style={{ cursor: "pointer" }}>×</span>
                  </span>
                </ListGroup.Item>
              );
            })}
          </div>

          <Form>
            <InputGroup className="mb-3">
              <FormControl placeholder="Search users" onInput={search} />
            </InputGroup>

            {currentList.map((user) => {
              return participantsIds.includes(user.id) ? null : (
                <Form.Group key={user.id}>
                  <ListGroup.Item
                    onClick={() => addParticipant(user.id, user.nickname)}
                  >
                    {user.nickname}
                  </ListGroup.Item>
                </Form.Group>
              );
            })}

            <Form.Group className="mb-3" controlId="chatName">
              <Form.Label>Chat Name</Form.Label>
              <Form.Control type="text" placeholder="Enter chat name" onChange={setName}/>
            </Form.Group>

            <Button variant="primary" onClick={createGroup}>
              Create Group Chat
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default AddGroupChat;
