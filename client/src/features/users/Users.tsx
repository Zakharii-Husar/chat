import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import {
  fetchAllUsersAsync,
  searchUsers,
  updateSearchedUser,
  getChatIdByUsername,
} from "../../state/usersSlice";
import { IUserModel } from "./userInterfaces";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import { FaUserCircle } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useCheckAuth } from "../../hooks/useCheckAuth";

const Users: React.FC = () => {
  useCheckAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );

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

  const navToChat = async (username: string) => {
    try {
      const action = await dispatch(getChatIdByUsername(username));
      const chatId = action.payload;
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
