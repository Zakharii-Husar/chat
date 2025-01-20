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
  const formData = useAppSelector((state) => state.register);
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
      alert("Please fix validation errors!");
    }
  };

  return (
    <Container className="register-container">
      <Card className="register-card">
        <Card.Body className="register-card__body">
          <h2 className="register-card__title">Create an account</h2>
          <Form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form__group">
              <label htmlFor="email">Email</label>
              <Form.Control
                className="register-form__input"
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInput}
              />
              {validationErrors.email && (
                <span className="register-form__error">{validationErrors.email}</span>
              )}
            </div>

            <div className="register-form__group">
              <label htmlFor="fullName">Full Name</label>
              <Form.Control
                className="register-form__input"
                placeholder="Full name"
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleInput}
              />
              {validationErrors.fullName && (
                <span className="register-form__error">{validationErrors.fullName}</span>
              )}
            </div>

            <div className="register-form__group">
              <label htmlFor="nickName">Nickname</label>
              <Form.Control
                className="register-form__input"
                placeholder="Nickname"
                type="text"
                name="nickName"
                value={formData.nickName || ''}
                onChange={handleInput}
              />
              {validationErrors.nickName && (
                <span className="register-form__error">{validationErrors.nickName}</span>
              )}
            </div>

            <div className="register-form__group">
              <label htmlFor="password">Password</label>
              <Form.Control
                className="register-form__input"
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleInput}
              />
              {validationErrors.password && (
                <span className="register-form__error">{validationErrors.password}</span>
              )}
            </div>

            <div className="register-form__group">
              <label htmlFor="confirm">Confirm Password</label>
              <Form.Control
                className="register-form__input"
                placeholder="Confirm password"
                type="password"
                name="confirm"
                value={formData.confirm || ''}
                onChange={handleInput}
              />
              {validationErrors.confirm && (
                <span className="register-form__error">{validationErrors.confirm}</span>
              )}
            </div>

            <Button className="register-form__button" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
