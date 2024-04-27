import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Outlet } from "react-router-dom";
import { MainHeader } from "./Header";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export const Root = () => {
  useCheckAuth();

  return (
    <MDBContainer fluid className="d-flex w-100 h-100">
      <MDBRow>
        <MDBCol className="d-flex flex-column w-100 h-100 p-0">
          <MainHeader />
          <Outlet />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
