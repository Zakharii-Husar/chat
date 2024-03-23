import { useEffect } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  fetchAllUsersAsync,
  searchUsers,
  updateSearchedUser,
} from "../../../users/usersSlice";

import { addChatCandidates } from "../../currentChat/newChatSlice";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { IChatMember } from "../../messagesInterfaces";

const AddCandidates: React.FC = () => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );
  const currentUserId = useAppSelector((state) => state.auth.response.id);

  const newChat = useAppSelector((state) => state.newChat);
  const currentUsersList = searchedUser ? filteredUsers : allUsers;
  const dispatch = useAppDispatch();

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

  const add = (member: IChatMember) => {
    dispatch(addChatCandidates(member));
  };

  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row>
          <Form>
            <InputGroup className="mb-3">
              <FormControl placeholder="Search users" onInput={search} />
            </InputGroup>

            {currentUsersList.map((user) => {
              //prevent showing current user and already added users
              return newChat.candidates.some(
                (member) => member.memberId === user.id || user.id === currentUserId
              ) ? null : (
                //show candidats
                <Form.Group key={user.id}>
                  <ListGroup.Item>
                    <span
                      onClick={() =>
                        add({
                          userName: user.nickname,
                          memberId: user.id,
                          isCreator: false,
                        })
                      }
                    >
                      {user.nickname}
                    </span>
                  </ListGroup.Item>
                </Form.Group>
              );
            })}
          </Form>
        </Row>
      </Col>
    </Container>
  );
};

export default AddCandidates;
