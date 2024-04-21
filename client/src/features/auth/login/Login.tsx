import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { setLogin, setPassword } from "../../../state/loginSlice";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import loginWithPasswordThunk from "../../../thunks/loginWithPasswordThunk";

import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBRow,
} from "mdb-react-ui-kit";

import { useCheckAuth } from "../../../hooks/useCheckAuth";

export function Login() {
  useCheckAuth();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.loggedInUser);
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "login") dispatch(setLogin(e.target.value));
    if (e.target.name === "password") dispatch(setPassword(e.target.value));
  };

  useEffect(() => {
    if (currentUser.id) navigate("/");
  }, [currentUser, navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const action = await dispatch(loginWithPasswordThunk());
    if (!action.payload) setShowError(true);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex flex-column align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <MDBRow className={"z-3 bg-danger d-" + (showError ? "flex" : "none")}>
        <h1>Wrong Credentials</h1>
      </MDBRow>
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Sign in</h2>

          <MDBInput
            onInput={handleInput}
            type="text"
            name="login"
            wrapperClass="mb-4"
            label="Nickname or email"
            size="lg"
          />

          <MDBInput
            onInput={handleInput}
            name="password"
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form3"
            type="password"
          />
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={handleSubmit}
          >
            Sign in
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
