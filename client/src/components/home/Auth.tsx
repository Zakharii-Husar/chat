import {
  Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Auth.scss";

export const Auth: React.FC = () => {
  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Card.Header className="auth-card__header">
          Welcome to Chat App
        </Card.Header>
        <Card.Body className="auth-card__body">
          <Link to="login" className="auth-button">
            Sign in
          </Link>
          <Link to="register" className="auth-button">
            Sign up
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};
