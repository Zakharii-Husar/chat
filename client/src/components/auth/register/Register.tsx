import React, { SyntheticEvent, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../hooks/useAppSelectorAndDispatch';
import { setEmail, setFullName, setNickName, setPassword, setConfirm } from '../../../redux/slices/registerSlice';
import registerWithPasswordThunk from '../../../redux/thunks/registerWithPasswordThunk';
import { useRegValidation } from '../../../hooks/useRegValidation';
import { useNavigate } from 'react-router';

export function Register() {
  const navigate = useNavigate();
  useRegValidation();

  const validationErrors = useAppSelector((state) => state.register.validationErrors);
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser.id) navigate('/');
  }, [currentUser]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'fullName':
        dispatch(setFullName(value));
        break;
      case 'nickName':
        dispatch(setNickName(value));
        break;
      case 'password':
        dispatch(setPassword(value));
        break;
      case 'confirm':
        dispatch(setConfirm(value));
        break;
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const inputIsOk = Object.values(validationErrors).every((err) => err === '');
    if (inputIsOk) {
      dispatch(registerWithPasswordThunk());
    } else {
      alert('YOU HAVE VALIDATION ERRORS!');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Card className="m-5" style={{ maxWidth: '600px' }}>
        <Card.Body className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Email {validationErrors.email}</Form.Label>
              <Form.Control type="email" name="email" size="lg" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Full Name {validationErrors.fullName}</Form.Label>
              <Form.Control type="text" name="fullName" size="lg" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Nickname {validationErrors.nickName}</Form.Label>
              <Form.Control type="text" name="nickName" size="lg" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password {validationErrors.password}</Form.Label>
              <Form.Control type="password" name="password" size="lg" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm {validationErrors.confirm}</Form.Label>
              <Form.Control type="password" name="confirm" size="lg" onChange={handleInput} />
            </Form.Group>

            <Row className="mb-4">
              <Col className="d-flex justify-content-center">
                <Form.Check
                  type="checkbox"
                  id="flexCheckDefault"
                  label="I agree all statements in Terms of service"
                />
              </Col>
            </Row>

            <Button className="mb-4 w-100 gradient-custom-4" size="lg" onClick={handleSubmit}>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
