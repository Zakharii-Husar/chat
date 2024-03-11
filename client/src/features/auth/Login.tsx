import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/useAppSelectorAndDispatch";
import { setLogin, setPassword } from "./loginSlice";
import { SyntheticEvent, useEffect } from "react";
import { loginAsync } from "./loginSlice";
import { useNavigate } from "react-router";

import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdb-react-ui-kit";

import { useCheckAuth } from "../../hooks/useCheckAuth";

export function Login() {
  useCheckAuth();
  const navigate = useNavigate();

  const { id: loggedInUserId, nickname } = useAppSelector(
    (state) => state.auth.response
  );

  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "login") dispatch(setLogin(e.target.value));
    if (e.target.name === "password") dispatch(setPassword(e.target.value));
  };

  useEffect(() => {
    if (loggedInUserId) navigate("/");
  }, [loggedInUserId, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginAsync());
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
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
