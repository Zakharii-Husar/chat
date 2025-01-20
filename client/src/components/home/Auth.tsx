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
          <button className="auth-button">
            <Link to="login">Sign in</Link>
          </button>
          <button className="auth-button">
            <Link to="register">Sign up</Link>
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};
