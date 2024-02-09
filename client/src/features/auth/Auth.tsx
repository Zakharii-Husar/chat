import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import { setLogin, setPassword } from './authSlice';
import { SyntheticEvent, useEffect } from 'react';
import { loginAsync } from './authSlice';
import { useNavigate } from 'react-router';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export function Auth() {
  const navigate = useNavigate();

  const uEmail = useAppSelector(state => state.auth.request.email);
  const uPswd = useAppSelector(state => state.auth.request.password);

  const { id: loggedInUserId, nickName } = useAppSelector(state => state.auth.response);

  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "login") dispatch(setLogin(e.target.value));
    if (e.target.name === "password") dispatch(setPassword(e.target.value));
  };

  useEffect(() => {
    if (loggedInUserId) navigate("/");
  }, [loggedInUserId])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginAsync({ email: uEmail, password: uPswd }));
    console.log(uEmail, uPswd);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <Col xs={12} style={{ flexShrink: 0 }}>
          <Form.Label htmlFor="inputEmail">Email</Form.Label>
          <Form.Control
            onInput={handleInput}
            type="email"
            name="login"
            id="inputEmail"
            aria-describedby="passwordHelpBlock"
            className="mb-4"
          />
          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control
            onInput={handleInput}
            type="password"
            name="password"
            id="inputPassword"
            aria-describedby="passwordHelpBlock"
            className="mb-4"
          />

          <Form.Check
            id="captcha"
            type="checkbox"
            label="I'm not a robot"
            className="mb-4" />
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Col>
      </form>
    </Container>
  )
}