import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { MdModeEdit } from "react-icons/md";
import UploadAvatar from "./UploadAvatar";
import { GET_AVATAR } from "../../app/APIEndpoints";

import { FaUserSecret } from "react-icons/fa6";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";

export default function User() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const hasAvatar = currentUser.avatarName !== null;

  return (
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
                  {"@" + currentUser.userName}
                </h3>
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <div
                    className="mt-4 mb-2"
                    style={{
                      width: "150px",
                      zIndex: "1",
                      border: "3px solid white",
                      borderRadius: "5px",
                      background: "black",
                    }}
                  >
                    {!hasAvatar ? (
                      <span>
                        <FaUserSecret size={150} />
                      </span>
                    ) : (
                      <MDBCardImage
                    
                      className="w-100"
                        src={GET_AVATAR + currentUser.avatarName}
                        alt="Generic placeholder image"
                        fluid
                        style={{ width: "150px", zIndex: "1" }}
                      />
                    )}
                    <UploadAvatar />
                  </div>
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
                  <MDBTypography tag="h5">{currentUser.fullName}</MDBTypography>
                  <MDBCardText>{currentUser.email}</MDBCardText>
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
                  <MdModeEdit cursor="pointer"/>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
