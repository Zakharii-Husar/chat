import { useEffect } from "react";
import { Form, InputGroup, ListGroup, FormControl } from "react-bootstrap";
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
import { IChatMember } from "../../../app/userInterfaces";

const SearchUsers: React.FC<{ isNewGroup: boolean }> = ({isNewGroup}) => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );
  const newChat = useAppSelector((state) => state.newChat);
  const existingChat = useAppSelector(state=> state.existingChat)
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

  const addCandidat = (member: IChatMember) =>{
    dispatch(addChatCandidats(member));
  };

  const addMember = (member: IChatMember) =>{
    dispatch(addChatMember(member))
  }

  const add = (member: IChatMember) => {
    if(isNewGroup){
        addCandidat(member);
    }else{
        addMember(member);
    }
  };
  const currentMembersList = isNewGroup ? newChat : existingChat;
  return (
    <Form>
      <InputGroup className="mb-3">
        <FormControl placeholder="Search users" onInput={search} />
      </InputGroup>

      {currentUsersList.map((user) => {
       return currentMembersList.members.some(member => member.memberId === user.id) ? null : (
          <Form.Group key={user.id}>
            <ListGroup.Item
              onClick={() => add({userName:user.nickname, memberId: user.id})}
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
