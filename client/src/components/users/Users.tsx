import { useEffect, useCallback, useRef } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import { updateSearchedUser } from "../../redux/slices/usersSlice";
import { IUser } from "../../Interfaces";

import { useCheckAuth } from "../../hooks/useCheckAuth";
import getAllUsersThunk from "../../redux/thunks/getAllUsersThunk";
import searchUsersThunk from "../../redux/thunks/searchUsersThunk";
import getChatIdByUsernameThunk from "../../redux/thunks/getChatIdByUsernameThunk";
import createPrivateChatThunk from "../../redux/thunks/createPrivateChatThunk";
import { useRedirectAsync } from "../../hooks/useRedirectAsync";
import Avatar from "../reusable/Avatar/Avatar";
import { Link } from "react-router-dom";
import PATH from "../../routing/pathConstants";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoPaperPlaneSharp } from "react-icons/io5";
import Loading from "../reusable/Loading";
import "./Users.scss";
import { Virtuoso } from "react-virtuoso";

const Users: React.FC = () => {
  useCheckAuth();
  const redirectAsync = useRedirectAsync();
  const dispatch = useAppDispatch();
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  const { allUsers, filteredUsers, searchedUser, hasMore, isLoading } = useAppSelector(
    (state) => state.users
  );

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

  useEffect(() => {
    if (!searchedUser) return;

    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    timeOut.current = setTimeout(() => {
      dispatch(searchUsersThunk(searchedUser));
    }, 1000);
  }, [searchedUser]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const navToChat = async (username: string) => {
    try {
      const action = await dispatch(getChatIdByUsernameThunk(username));
      if (action.payload) {
        redirectAsync();
      } else {
        await dispatch(createPrivateChatThunk(username));
        redirectAsync();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const currentList = searchedUser === null ? allUsers : filteredUsers;

  const UserItem = useCallback((index: number) => {
    const user = currentList[index];
    if (!user) return <Loading />;

    return (
      <li className="users__item">
        <Link to={`${PATH.users}/${user.userName}`} className="users__profile-link">
          <div className={`users__avatar-wrapper ${user.isOnline ? 'online' : ''}`}>
            <Avatar size="M" fileName={user.avatarName} isGroup={false} />
          </div>
          <div className="users__info">
            <h5>{user.userName}</h5>
            <span className={`users__status ${user.isOnline ? 'online' : 'offline'}`}>
              {user.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </Link>

        <button
          className="users__message-btn"
          onClick={() => navToChat(user.userName!)}
          aria-label="Send message"
        >
          <IoPaperPlaneSharp size={16} />
          <span>Message</span>
        </button>
      </li>
    );
  }, [currentList]);

  return (
    <div className="users">
      <div className="users__container">
        <div className="users__header">
          <h1>Chat Community</h1>
        </div>

        <div className="users__search-wrapper">
          <HiMagnifyingGlass className="search-icon" />
          <input
            type="text"
            className="users__search"
            placeholder="Search users..."
            onChange={handleInput}
          />
        </div>

        <div className="users__list">
          <Virtuoso
            style={{ height: '100%' }}
            totalCount={currentList.length}
            itemContent={UserItem}
            endReached={loadMore}
            className="scrollable"
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
