import React, { SyntheticEvent, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
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
import { useRegValidation } from "../../../hooks/useRegValidation";
import { useNavigate } from "react-router";
import "./Register.scss";

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
    <Container
      fluid
      className="d-flex align-items-center justify-content-center h6 registerFontSize"
    >
      <Card className="m-2 mw-100 w-100">
        <Card.Body className="px-5">
          <h2 className="text-center mb-2">Create an account</h2>
          <Form>
            <Form.Group className="formGroup">
              <Form.Label className="text-danger" size="sm">
                {validationErrors.email}
              </Form.Label>
              <Form.Control
                placeholder="Email"
                size="sm"
                type="email"
                name="email"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label className="text-danger" size="sm">
                {validationErrors.fullName}
              </Form.Label>
              <Form.Control
                placeholder="Full name"
                size="sm"
                type="text"
                name="fullName"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label
                className="text-danger"
                size="sm"
              >
                {validationErrors.nickName}
              </Form.Label>
              <Form.Control
                placeholder="Nickname"
                size="sm"
                type="text"
                name="nickName"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label
                className="text-danger"
                size="sm"
              >
                {validationErrors.password}
              </Form.Label>
              <Form.Control
                placeholder="Password"
                size="sm"
                type="password"
                name="password"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label
                className="text-danger"
                size="sm"
              >
                {validationErrors.confirm}
              </Form.Label>
              <Form.Control
                placeholder="Confirm"
                size="sm"
                type="password"
                name="confirm"
                onChange={handleInput}
              />
            </Form.Group>

            <Button className="mt-2 w-100" size="sm" onClick={handleSubmit}>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
