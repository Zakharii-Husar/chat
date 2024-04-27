import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import {
  setEmail,
  setFullName,
  setNickName,
  setPassword,
  setConfirm,
} from "../../../redux/slices/registerSlice";
import registerWithPasswordThunk from "../../../redux/thunks/registerWithPasswordThunk";
import { SyntheticEvent, useEffect } from "react";
import { useRegValidation } from "../../../hooks/useRegValidation";
import { useNavigate } from "react-router";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Register.css";

export function Register() {
  const navigate = useNavigate();
  useRegValidation();

  const validationErrors = useAppSelector(
    (state) => state.register.validationErrors
  );

  const currentUser = useAppSelector((state) => state.loggedInUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser.id) navigate("/");
  }, [currentUser]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "email":
        dispatch(setEmail(value));
        break;
      case "fullName":
        dispatch(setFullName(value));
        break;
      case "nickName":
        dispatch(setNickName(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "confirm":
        dispatch(setConfirm(value));
        break;
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const inputIsOk = Object.values(validationErrors).every(
      (err) => err === ""
    );
    if (inputIsOk) {
      dispatch(registerWithPasswordThunk());
    } else {
      alert("YOU HAVE VALIDATION ERRORS!");
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput
            onChange={handleInput}
            name="email"
            wrapperClass="mb-4"
            label={"Email " + validationErrors.email}
            size="lg"
            id="form2"
            type="email"
          />
          <MDBInput
            onInput={handleInput}
            name="fullName"
            wrapperClass="mb-4"
            label={"Full Name " + validationErrors.fullName}
            size="lg"
            type="text"
          />

          <MDBInput
            onChange={handleInput}
            name="nickName"
            wrapperClass="mb-4"
            label={"Nickname " + validationErrors.nickName}
            size="lg"
            type="text"
          />

          <MDBInput
            onInput={handleInput}
            name="password"
            wrapperClass="mb-4"
            label={"Password " + validationErrors.password}
            size="lg"
            id="form3"
            type="password"
          />

          <MDBInput
            onInput={handleInput}
            name="confirm"
            wrapperClass="mb-4"
            label={"Confirm " + validationErrors.confirm}
            size="lg"
            id="form4"
            type="password"
          />
          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I agree all statements in Terms of service"
            />
          </div>
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={handleSubmit}
          >
            Register
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
