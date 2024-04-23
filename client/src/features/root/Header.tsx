import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { IoIosMail } from "react-icons/io";
import Avatar from "../users/Avatar";
export const MainHeader: React.FC = () => {
  useCheckAuth();

  const user = useAppSelector((state) => state.loggedInUser);

  return (
    <MDBContainer fluid className="d-flex justify-content-center vw-100 p-2">
      <MDBRow className="align-items-center">
        {!user.userName ? null : (
          <MDBCol>
            <Link to={"/users/" + user.userName}>
              <Avatar size="M" fileName={user.avatarName} editBtn={false} isGroup={false}/>
            </Link>
          </MDBCol>
        )}

        <MDBCol style={{ color: "blue" }}>
          <Link
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
              <Link style={{ textDecoration: "none" }} to="/chats">
                <IoIosMail size="50" />
              </Link>
            </div>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
};
