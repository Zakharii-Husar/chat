import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Auth: React.FC = () => {
  return (
    <Container className="d-flex  flex-column align-items-center vw-100">
      <Row className="d-flex mb-4">
        <Col xs={12}>
          <div>
            <h2>Sign in or create an account</h2>
          </div>
        </Col>
      </Row>
      <Row className="d-flex flex-row w-100 justify-content-center">
        <Col xs={"auto"}>
          <div>
            <Link to="login">Sign in</Link>
          </div>
        </Col>
        <Col xs={"auto"}>
          <div>
            <Link to="register">Sign up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
