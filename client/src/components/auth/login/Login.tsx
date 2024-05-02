import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { setLogin, setPassword } from "../../../redux/slices/loginSlice";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import loginWithPasswordThunk from "../../../redux/thunks/loginWithPasswordThunk";

import { Container, Card, Button, Col, Row, Form } from "react-bootstrap";

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
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Col xs={12}>
        <Card>
          <Card.Body>
            <h2 className="text-uppercase text-center">Sign in</h2>
            <h3
              className={
                "rounded-3 text-center p-1 z-3 justify-content-center text-danger " +
                (showError ? "visible" : "invisible")
              }
            >
              Invalid Credentials!
            </h3>
            <Form.Group className="mb-2">
              <Form.Label>Nickname or email</Form.Label>
              <Form.Control type="text" name="login" onInput={handleInput} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onInput={handleInput}
              />
            </Form.Group>

            <Button
              className="mb-4 w-100 gradient-custom-3"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}
