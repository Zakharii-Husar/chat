import { useCheckAuth } from "../hooks/useCheckAuth";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./Header";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export const Layout = () => {
  useCheckAuth();

  return (
    <MDBContainer fluid className="d-flex w-100 h-100">
      <MDBRow>
        <MDBCol className="d-flex flex-column w-100 h-100 p-0">
          <AppHeader />
          <Outlet />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
