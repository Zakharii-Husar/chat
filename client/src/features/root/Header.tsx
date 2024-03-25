import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { IoIosMail } from "react-icons/io";

export const MainHeader: React.FC = () => {
  useCheckAuth();

  const userName = useAppSelector((state) => state.loggedInUser.userName);

  return (
    <MDBContainer fluid className="d-flex justify-content-center vw-100 p-2">
      <MDBRow className="align-items-center">
        {!userName ? null : (
          <MDBCol>
            <Link to={"/users/" + userName}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
              className="rounded-circle d-flex align-self-start mx-3 shadow-1-strong"
              width="40"
            />
            </Link>
          </MDBCol>
        )}

        <MDBCol
          style={{ color: "blue" }}
        >
          <Link to="/" className="text-xl d-flex flex-row w-100 justify-content-between">
            <h1>Chat</h1>
            <TiMessages size={40} className="mx-4" />
            <h1>:)</h1>
          </Link>
        </MDBCol>

        {!userName ? null : (
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
