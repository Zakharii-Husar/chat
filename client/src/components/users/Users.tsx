import { useEffect, useRef } from "react";
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
import "./Users.scss";

const Users: React.FC = () => {
  useCheckAuth();
  const redirectAsync = useRedirectAsync();
  const dispatch = useAppDispatch();

  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (allUsers.length <= 1) {
      dispatch(getAllUsersThunk());
    }
  }, []);

  const timeOut = useRef<NodeJS.Timeout | null>(null);
  
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

        <ul className="users__list">
          {currentList?.map((user: IUser) => (
            <li key={user.id} className="users__item">
              <Link
                to={`${PATH.users}/${user.userName}`}
                className="users__profile-link"
              >
                <Avatar
                  size="M"
                  fileName={user.avatarName}
                  isGroup={false}
                />
                <h5>{user.userName}</h5>
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
