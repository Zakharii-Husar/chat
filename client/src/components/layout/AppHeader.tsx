import { Container, Row, Col } from "react-bootstrap";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { IoIosMail } from "react-icons/io";
import Avatar from "../reusable/Avatar/Avatar";
import "./AppHeader.scss";
export const AppHeader: React.FC = () => {
  // useCheckAuth();

  const user = useAppSelector((state) => state.loggedInUser);
  const chats = useAppSelector((state) => state.chats.chats);
  const unread = chats
    .slice(0, 5)
    .filter((c) => c.seenBy.length === 0 && c.senderId !== user.id).length;

  return (
    <Container fluid className="w-100 pt-2 d-flex justify-content-center align-items-center">
      <Row className="Header w-100 justify-content-center align-items-center">
        {!user.userName ? null : (
          <Col xs={2}>
            <Link className="d-flex align-items-center justify-content-center" to={"/users/" + user.userName}>
              <Avatar
                size="M"
                fileName={user.avatarName}
                editBtn={false}
                isGroup={false}
              />
            </Link>
          </Col>
        )}

        <Col xs={8}>
          <Link
            to="/"
            className="text-xl d-flex flex-row justify-content-around"
          >
            <h1>Chat</h1>
            <TiMessages size={40} />
            <h1>:)</h1>
          </Link>
        </Col>

        {!user.userName ? null : (
          <Col xs={2}>
            <div>
              <Link className="position-relative" to="/chats">
                <IoIosMail size="60" />
                <div
                  className={
                    "position-absolute top-50 start-50 translate-middle badge rounded-pill bg-danger " +
                    (unread > 0 ? "d-flex" : "d-none")
                  }
                >
                  <span>{unread < 5 ? unread : "5+"}</span>
                </div>
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};
