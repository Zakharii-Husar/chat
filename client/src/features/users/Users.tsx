import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import { updateSearchedUser } from "../../state/usersSlice";
import { IUser } from "../../state/Interfaces";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import { FaUserCircle } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import getAllUsersThunk from "../../thunks/getAllUsersThunk";
import searchUsersThunk from "../../thunks/searchUsersThunk";
import getChatIdByUsernameThunk from "../../thunks/getChatIdByUsernameThunk";
import createPrivateChatThunk from "../../thunks/createPrivateChatThunk";
import { useRedirectAsync } from "../../hooks/useRedirectAsync";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Users: React.FC = () => {
  useCheckAuth();
  const redirectAsync = useRedirectAsync();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [redirectTrigger, setRedirectTrigger] = useState(false);
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  const currentChatId = useAppSelector((state) => state.currentChat.chatId);

  useEffect(() => {
    const initialLoad = () => {
      if (allUsers.length > 1) return;
      dispatch(getAllUsersThunk());
    };
    initialLoad();
  }, []);

  useEffect(() => {
    if (searchedUser) dispatch(searchUsersThunk(searchedUser));
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
        return;
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
    <Container fluid className="d-flex vw-100">
      <Row className="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
        <Col xs={12} md={8} lg={8} xl={8}>
          <Form.Control
            type="text"
            placeholder="Search users..."
            onInput={handleInput}
          />

          <ListGroup>
            {currentList?.map((user: IUser) => (
              <ListGroup.Item
                key={user.id}
                className="d-flex w-100 align-items-center justify-content-between py-1"
              >
                <Link
                  to={"users/" + user.userName}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  className="d-flex flex-row align-items-center"
                >
                  <Avatar
                    size="M"
                    fileName={user.avatarName}
                    editBtn={false}
                    isGroup={false}
                  />
                  <h5>{`${user.userName}`}</h5>
                </Link>

                <BsFillSendFill
                  onClick={() => {
                    navToChat(user.userName!);
                  }}
                  size={25}
                  className="me-2"
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
