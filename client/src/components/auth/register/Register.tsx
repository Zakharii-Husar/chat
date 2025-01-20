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
    <Container className="register-container">
      <Card className="register-card">
        <Card.Body className="register-card__body">
          <h2 className="register-card__title">Create an account</h2>
          <Form className="register-form">
            <Form.Group className="register-form__group">
              <Form.Label className="register-form__error">
                {validationErrors.email}
              </Form.Label>
              <Form.Control
                className="register-form__input"
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="register-form__group">
              <Form.Label className="register-form__error">
                {validationErrors.fullName}
              </Form.Label>
              <Form.Control
                className="register-form__input"
                placeholder="Full name"
                type="text"
                name="fullName"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="register-form__group">
              <Form.Label className="register-form__error">
                {validationErrors.nickName}
              </Form.Label>
              <Form.Control
                className="register-form__input"
                placeholder="Nickname"
                type="text"
                name="nickName"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="register-form__group">
              <Form.Label className="register-form__error">
                {validationErrors.password}
              </Form.Label>
              <Form.Control
                className="register-form__input"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="register-form__group">
              <Form.Label className="register-form__error">
                {validationErrors.confirm}
              </Form.Label>
              <Form.Control
                className="register-form__input"
                placeholder="Confirm"
                type="password"
                name="confirm"
                onChange={handleInput}
              />
            </Form.Group>

            <Button className="register-form__button" onClick={handleSubmit}>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
