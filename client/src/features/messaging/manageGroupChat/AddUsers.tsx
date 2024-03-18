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
import {
  fetchAllUsersAsync,
  searchUsers,
  updateSearchedUser,
} from "../../users/usersSlice";

import { addChatCandidats } from "../chat/newChatSlice";
import { addChatMember } from "../chat/existingChatSlice";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { IChatMember } from "../../../features/messaging/messagesInterfaces";

const AddUsers: React.FC<{ isNewGroup: boolean }> = ({ isNewGroup }) => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  const existingChat = useAppSelector((state) => state.existingChat);
  const currentUserId = useAppSelector((state) => state.auth.response.id);
  const isCreator = existingChat.members.find(
    (member) => member.memberId === currentUserId
  )?.isCreator;
  const newChat = useAppSelector((state) => state.newChat);
  const currentUsersList = searchedUser ? filteredUsers : allUsers;
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

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

  const addCandidat = (member: IChatMember) => {
    dispatch(addChatCandidats(member));
  };

  const addMember = (member: IChatMember) => {
    dispatch(addChatMember(member));
  };

  const add = (member: IChatMember) => {
    if (isNewGroup) {
      addCandidat(member);
    } else {
      addMember(member);
    }
  };
  const currentMembersList = isNewGroup ? newChat : existingChat;
  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row className={"d-" + (!isNewGroup && isCreator ? "flex" : "none")}>
          <Button
            className={"d-" + (isNewGroup ? "none" : "flex")}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Members"}
          </Button>
        </Row>
        <Row>
          <Collapse in={showForm || isNewGroup}>
            <Form>
              <InputGroup className="mb-3">
                <FormControl placeholder="Search users" onInput={search} />
              </InputGroup>

              {currentUsersList.map((user) => {
                //prevent showing already added users
                return currentMembersList.members.some(
                  (member) => member.memberId === user.id
                ) ? null : (
                  //show candidats
                  <Form.Group key={user.id}>
                    <ListGroup.Item
                      onClick={() =>
                        add({
                          userName: user.nickname,
                          memberId: user.id,
                          isCreator: false,
                        })
                      }
                    >
                      {user.nickname}
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

export default AddUsers;
