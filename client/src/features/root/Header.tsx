import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { IoIosMail } from "react-icons/io";

export const MainHeader: React.FC = () => {
  useCheckAuth();

  const nickname = useAppSelector((state) => state.auth.response.nickname);

  return (
    <MDBContainer fluid className="d-flex justify-content-center vw-100 p-2">
      <MDBRow className="align-items-center">
        {!nickname ? null : (
          <MDBCol>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
              className="rounded-circle d-flex align-self-start mx-3 shadow-1-strong"
              width="40"
            />
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

        {!nickname ? null : (
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
