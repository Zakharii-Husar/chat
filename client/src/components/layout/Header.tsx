import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { IoIosMail } from "react-icons/io";
import Avatar from "../reusable/Avatar";
import "./Header.css";
export const AppHeader: React.FC = () => {
 // useCheckAuth();

  const user = useAppSelector((state) => state.loggedInUser);
  const chats = useAppSelector((state) => state.chats.chats);
  const unread = chats
    .slice(0, 5)
    .filter((c) => c.seenBy.length === 0 && c.senderId !== user.id).length;

  return (
    <MDBContainer
      fluid
      className="orbitron d-flex justify-content-center vw-100 p-2"
    >
      <MDBRow className="align-items-center">
        {!user.userName ? null : (
          <MDBCol>
            <Link to={"/users/" + user.userName}>
              <Avatar
                size="M"
                fileName={user.avatarName}
                editBtn={false}
                isGroup={false}
              />
            </Link>
          </MDBCol>
        )}

        <MDBCol style={{ color: "blue" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to="/"
            className="text-xl d-flex flex-row w-100 justify-content-between"
          >
            <h1>Chat</h1>
            <TiMessages size={40} className="mx-4" />
            <h1>:)</h1>
          </Link>
        </MDBCol>

        {!user.userName ? null : (
          <MDBCol>
            <div style={{ color: "blue" }}>
              <Link
                className="position-relative"
                style={{ textDecoration: "none" }}
                to="/chats"
              >
                <IoIosMail size="60" />
                <div
                  className={
                    "position-absolute top-50 start-50 translate-middle badge rounded-pill bg-danger d-" +
                    (unread > 0 ? "flex" : "none")
                  }
                >
                  <span>{unread < 5 ? unread : "5+"}</span>
                </div>
              </Link>
            </div>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
};
