import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { MdModeEdit } from "react-icons/md";
import UploadAvatar from "./UploadAvatar";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import Avatar from "./Avatar";
import { useParams } from "react-router";
import { useEffect } from "react";
import getUserDetailsThunk from "../../thunks/getUserDetailsThunk";

export default function User() {
  const { userName } = useParams();

  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector((state) => state.loggedInUser);
  const anotherUser = useAppSelector((state) => state.viewUser);
  const isMyPofile = loggedInUser.userName === userName;
  const currentProfile = isMyPofile ? loggedInUser : anotherUser;

  useEffect(() => {
    if (userName && !isMyPofile) {
      dispatch(getUserDetailsThunk(userName));
    }
  }, [userName]);

  return !currentProfile.id ? (
    <h1>LOADING...</h1>
  ) : (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <h3 className="d-flex position-absolute p-2">
                  {"@" + currentProfile.userName}
                </h3>
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <Avatar size="L" />
                  <UploadAvatar />
                  <MDBBtn
                    className="my-2"
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Send Message
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {currentProfile.fullName}
                  </MDBTypography>
                  <MDBCardText>{currentProfile.email}</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">About</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Photographer.
                    </MDBCardText>
                  </div>
                  <MdModeEdit cursor="pointer" />
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
