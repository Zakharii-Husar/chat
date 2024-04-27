import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
export const Auth: React.FC = () => {
  return (
    <>
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
              <Link to="login">
                <MDBBtn
                  className="m-2"
                  outline
                  size="lg"
                  rel="nofollow"
                  target="_blank"
                >
                  Sign in
                </MDBBtn>
              </Link>
            </div>
          </Col>
          <Col xs={"auto"}>
            <div>
              <Link to="register">
                <MDBBtn
                  className="m-2"
                  outline
                  size="lg"
                  rel="nofollow"
                  target="_blank"
                >
                  Sign up
                </MDBBtn>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
