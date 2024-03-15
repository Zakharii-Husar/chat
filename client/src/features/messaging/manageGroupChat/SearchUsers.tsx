import { useEffect } from "react";
import { Form, InputGroup, ListGroup, FormControl } from "react-bootstrap";
import {
  fetchAllUsersAsync,
  searchUsers,
  updateSearchedUser,
} from "../../users/usersSlice";

import { addChatParticipants } from "../chat/newChatSlice";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";

const SearchUsers = () => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );
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

  const addParticipant = (id: string, userName: string) => {
    dispatch(addChatParticipants({ id: id, name: userName }));
  };

  return (
    <Form>
      <InputGroup className="mb-3">
        <FormControl placeholder="Search users" onInput={search} />
      </InputGroup>

      {currentUsersList.map((user) => {
        return newChat.participantsIds.includes(user.id) ? null : (
          <Form.Group key={user.id}>
            <ListGroup.Item
              onClick={() => addParticipant(user.id, user.nickname)}
            >
              {user.nickname}
            </ListGroup.Item>
          </Form.Group>
        );
      })}
    </Form>
  );
};

export default SearchUsers;
