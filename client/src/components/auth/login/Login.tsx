import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { setLogin, setPassword } from "../../../redux/slices/loginSlice";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import loginWithPasswordThunk from "../../../redux/thunks/loginWithPasswordThunk";

import { Container, Card, Form } from "react-bootstrap";

import { useCheckAuth } from "../../../hooks/useCheckAuth";
import "./Login.scss";

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
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body className="login-card__body">
          <h2 className="login-card__title">Sign in</h2>
          <div className={`login-form__error ${showError ? 'visible' : 'invisible'}`}>
            Invalid Credentials!
          </div>
          
          <Form className="login-form">
            <Form.Group className="login-form__group">
              <Form.Label>Nickname or email</Form.Label>
              <Form.Control 
                className="login-form__input"
                type="text" 
                name="login" 
                onInput={handleInput} 
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="login-form__group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="login-form__input"
                type="password"
                name="password"
                onInput={handleInput}
                autoComplete="current-password"
              />
            </Form.Group>

            <button className="login-form__button" onClick={handleSubmit}>
              Sign in
            </button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
