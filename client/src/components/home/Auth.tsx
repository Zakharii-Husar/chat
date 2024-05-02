import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
export const Auth: React.FC = () => {
  return (
    <Container className="d-flex  flex-column align-items-center w-100 align-self-center m-5">
      <Row className="d-flex flex-row w-100 justify-content-center">
        <Col xs={"auto"} className="d-flex w-100">
          <Card className="d-flex w-100 text-center">
            <CardHeader className="text-center h3">Welcome</CardHeader>
            <CardBody className="d-flex flex-row w-100 justify-content-around">
              <Button>
                <Link to="login">Sign in</Link>
              </Button>
              <Button>
                <Link to="register">Sign up</Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
