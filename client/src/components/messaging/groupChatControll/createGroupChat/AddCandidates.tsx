import { useEffect, useCallback, useRef, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { updateSearchedUser } from "../../../../redux/slices/usersSlice";
import { addChatCandidates } from "../../../../redux/slices/createGroupSlice";
import { useAppSelector, useAppDispatch } from "../../../../hooks/useAppSelectorAndDispatch";
import { IChatMember, IUser } from "../../../../Interfaces";
import searchUsersThunk from "../../../../redux/thunks/searchUsersThunk";
import getAllUsersThunk from "../../../../redux/thunks/getAllUsersThunk";
import "./AddCandidates.scss";

const AddCandidates: React.FC = () => {
  const { allUsers, filteredUsers, searchedUser, hasMore, isLoading } = useAppSelector(
    (state) => state.users
  );
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const createGroupState = useAppSelector((state) => state.createGroup);
  const currentUsersList = searchedUser ? filteredUsers : allUsers;
  const dispatch = useAppDispatch();
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  // Load initial users
  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(getAllUsersThunk());
    }
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (!searchedUser) return;
    
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    
    timeOut.current = setTimeout(() => {
      dispatch(searchUsersThunk(searchedUser));
    }, 1000);

    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, [searchedUser, dispatch]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    
    if (searchedUser) {
      dispatch(searchUsersThunk(searchedUser));
    } else {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, hasMore, isLoading, searchedUser]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const add = (member: IChatMember) => {
    dispatch(addChatCandidates(member));
  };

  // Filter the list before passing to Virtuoso
  const filteredList = useMemo(() => {
    return currentUsersList.filter(user => 
      !createGroupState.candidates.some(
        member => member.memberId === user.id || user.id === currentUserId
      )
    );
  }, [currentUsersList, createGroupState.candidates, currentUserId]);

  const UserItem = useCallback((index: number) => {
    const user = filteredList[index];
    if (!user) return <div style={{ height: '48px' }}>Loading...</div>;

    return (
      <ListGroup.Item
        key={user.id}
        action
        onClick={() => add({
          userName: user.userName,
          memberId: user.id,
          isCreator: false,
        })}
      >
        {user.userName}
      </ListGroup.Item>
    );
  }, [filteredList]);

  return (
    <div className="add-candidates">
      <InputGroup className="mb-3">
        <FormControl 
          placeholder="Search users" 
          onChange={handleSearch}
        />
      </InputGroup>
      <div className="add-candidates__list">
        <Virtuoso
          style={{ height: '200px' }}
          totalCount={filteredList.length}
          itemContent={UserItem}
          endReached={loadMore}
          className="scrollable"
        />
      </div>
    </div>
  );
};

export default AddCandidates;
