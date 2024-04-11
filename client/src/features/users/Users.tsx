import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import { updateSearchedUser } from "../../state/usersSlice";
import { IUserModel } from "./userInterfaces";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import { FaUserCircle } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { getAllUsersThunk } from "../../thunks/getAllUsersThunk";
import { searchUsers } from "../../thunks/searchUsersThunk";
import { getChatIdByUsername } from "../../thunks/getChatIdByUsernameThunk";
import createPrivateThunk from "../../thunks/createPrivateThunk";

const Users: React.FC = () => {
  useCheckAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  useEffect(() => {
    if (searchedUser) dispatch(searchUsers(searchedUser));
  }, [searchedUser]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const navToChat = async (username: string) => {
    try {
      const getAction = await dispatch(getChatIdByUsername(username));
      let chatId = getAction.payload;
      if (!chatId) {
        const createAction = await dispatch(createPrivateThunk(username));
        chatId = createAction.payload;
      }
      navigate("/chats/" + chatId);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  const currentList = searchedUser === null ? allUsers : filteredUsers;
  return (
    <Container fluid className="d-flex vw-100">
      <Row className="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
        <Col xs={12} md={8} lg={4} xl={2}>
          <Form.Control
            type="text"
            placeholder="Search users..."
            onInput={search}
          />

          <ListGroup>
            {currentList?.map((user: IUserModel) => (
              <ListGroup.Item
                key={user.id}
                className="d-flex align-items-center justify-content-between py-1"
                onClick={() => navToChat(user.userName)}
              >
                <FaUserCircle size={25} className="ms-2" />

                <h5>{`${user.userName}`}</h5>

                <BsFillSendFill size={25} className="me-2" />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
