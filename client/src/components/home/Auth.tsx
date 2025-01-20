import {
  Row,
  Col,
  Container,
  Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Auth.scss";

export const Auth: React.FC = () => {
  return (
    <Container className="auth-container">
      <Row className="w-100">
        <Col>
          <Card className="auth-card">
            <Card.Header className="auth-card__header text-center">
              Welcome to Chat App
            </Card.Header>
            <Card.Body className="auth-card__body d-flex justify-content-around">
              <button className="auth-button">
                <Link to="login">Sign in</Link>
              </button>
              <button className="auth-button">
                <Link to="register">Sign up</Link>
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
