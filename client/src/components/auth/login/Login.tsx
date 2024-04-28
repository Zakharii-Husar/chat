import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { setLogin, setPassword } from "../../../redux/slices/loginSlice";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import loginWithPasswordThunk from "../../../redux/thunks/loginWithPasswordThunk";

import { Container, Card, Button, Row, Form } from "react-bootstrap";

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
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
      <Row className={"z-3 bg-danger d-" + (showError ? "flex" : "none")}>
        <h1>Wrong Credentials</h1>
      </Row>
      <Card className="m-5" style={{ maxWidth: "600px" }}>
        <Card.Body className="px-5">
          <h2 className="text-uppercase text-center mb-5">Sign in</h2>

          <Form.Group className="mb-4">
            <Form.Label>Nickname or email</Form.Label>
            <Form.Control type="text" name="login" size="lg" onInput={handleInput} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" size="lg" onInput={handleInput} />
          </Form.Group>

          <Button
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
