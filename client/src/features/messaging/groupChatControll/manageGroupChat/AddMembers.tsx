import { useEffect, useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateSearchedUser } from "../../../../state/usersSlice";

import addChatMemberThunk from "../../../../thunks/addChatMemberThunk";

import Confirmation from "./Confirmation";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { IUser } from "../../../../state/Interfaces";
import getAllUsersThunk from "../../../../thunks/getAllUsersThunk";
import searchUsersThunk from "../../../../thunks/searchUsersThunk";

const AddMembers: React.FC = () => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const isCreator = currentChat.adminId === currentUserId;

  const currentUsersList = searchedUser ? filteredUsers : allUsers;
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (searchedUser) dispatch(searchUsersThunk(searchedUser));
  }, [searchedUser]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input ?? null));
  };

  const add = (member: IUser) => {
    dispatch(addChatMemberThunk(member));
  };

  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row className={"d-" + (isCreator ? "flex" : "none")}>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add Members"}
          </Button>
        </Row>
        <Row>
          <Collapse in={showForm}>
            <Form>
              <InputGroup className="mb-3">
                <FormControl placeholder="Search users" onInput={search} />
              </InputGroup>

              {currentUsersList.map((user: IUser) => {
                //prevent showing already added users and current user
                return currentChat.members.some(
                  (member) =>
                    member.id === user.id || user.id === currentUserId
                ) ? null : (
                  //show candidats
                  <Form.Group key={user.id}>
                    <ListGroup.Item>
                      <Confirmation
                        buttonText={user.userName!}
                        titleText={`Add ${user.userName} to chat?`}
                        proceed={() =>
                          add(user)
                        }
                      />
                    </ListGroup.Item>
                  </Form.Group>
                );
              })}
            </Form>
          </Collapse>
        </Row>
      </Col>
    </Container>
  );
};

export default AddMembers;
