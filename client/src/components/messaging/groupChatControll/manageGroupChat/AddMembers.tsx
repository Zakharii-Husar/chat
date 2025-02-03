import { useEffect, useCallback, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { InputGroup, FormControl, ListGroup, Button, Collapse } from "react-bootstrap";
import { updateSearchedUser } from "../../../../redux/slices/usersSlice";
import { useAppSelector, useAppDispatch } from "../../../../hooks/useAppSelectorAndDispatch";
import addChatMemberThunk from "../../../../redux/thunks/addChatMemberThunk";
import getAllUsersThunk from "../../../../redux/thunks/getAllUsersThunk";
import searchUsersThunk from "../../../../redux/thunks/searchUsersThunk";
import Confirmation from "../../../reusable/Confirmation";
import "./AddMembers.scss";
import { IUser } from "../../../../Interfaces";

const AddMembers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const { allUsers, filteredUsers, searchedUser, hasMore, isLoading } = useAppSelector(
    (state) => state.users
  );
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const isCreator = currentChat.adminId === currentUserId;
  const currentUsersList = searchedUser ? filteredUsers : allUsers;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    
    if (searchedUser) {
      dispatch(searchUsersThunk(searchedUser));
    } else {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, hasMore, isLoading, searchedUser]);

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(getAllUsersThunk());
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const add = async (user: IUser) => {
    await dispatch(addChatMemberThunk(user));
  };

  const filteredList = currentUsersList.filter(user => 
    !currentChat.members.some(member => member.id === user.id) && 
    user.id !== currentUserId
  );

  const UserItem = useCallback((index: number) => {
    const user = filteredList[index];
    if (!user) return <div style={{ height: '48px' }}>Loading...</div>;

    return (
      <ListGroup.Item className="add-members__item">
        <span>{user.userName}</span>
        <Confirmation
          titleText={`Add ${user.userName} to chat?`}
          proceed={() => add(user)}
        >
          <Button variant="outline-primary" size="sm">Add</Button>
        </Confirmation>
      </ListGroup.Item>
    );
  }, [filteredList, currentChat.members]);

  if (!isCreator) return null;

  return (
    <div className="add-members">
      <Button 
        variant="primary"
        onClick={() => setShowForm(!showForm)}
        className="add-members__toggle"
      >
        {showForm ? "Cancel" : "Add Members"}
      </Button>

      <Collapse in={showForm}>
        <div className="add-members__content">
          <InputGroup className="add-members__search">
            <FormControl 
              placeholder="Search users" 
              onChange={handleSearch}
            />
          </InputGroup>
          <div className="add-members__list">
            <Virtuoso
              style={{ height: '180px' }}
              totalCount={filteredList.length}
              itemContent={UserItem}
              endReached={loadMore}
              className="scrollable"
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default AddMembers;
