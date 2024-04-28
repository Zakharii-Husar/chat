import { useEffect } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateSearchedUser } from "../../../../redux/slices/usersSlice";

import { addChatCandidates } from "../../../../redux/slices/createGroupSlice";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { IChatMember, IUser } from "../../../../redux/slices/Interfaces";
import getAllUsersThunk from "../../../../redux/thunks/getAllUsersThunk";
import searchUsersThunk from "../../../../redux/thunks/searchUsersThunk";

const AddCandidates: React.FC = () => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);

  const createGroupState = useAppSelector((state) => state.createGroup);
  const currentUsersList = searchedUser ? filteredUsers : allUsers;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchedUser) dispatch(searchUsersThunk(searchedUser));
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

            {currentUsersList.map((user: IUser) => {
              //prevent showing current user and already added users
              return createGroupState.candidates.some(
                (member) =>
                  member.memberId === user.id || user.id === currentUserId
              ) ? null : (
                //show candidats
                <Form.Group key={user.id}>
                  <ListGroup.Item>
                    <span
                      onClick={() =>
                        add({
                          userName: user.userName,
                          memberId: user.id,
                          isCreator: false,
                        })
                      }
                    >
                      {user.userName}
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
