import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Welcome: React.FC = () => {
    return (<>
        <Container className="d-flex  flex-column align-items-center vw-100">
            <Row className="d-flex mb-4">
                <Col xs={12}>
                    <div>
                        <h2>Welcome</h2>
                    </div>
                </Col>
            </Row>
            <Row
                className="d-flex flex-row w-100 justify-content-center">
                <Col xs={"auto"}>
                    <div>
                        <Link to="login">
                            <Button variant="link-btn" className="me-4 mt-4">Log in</Button>
                        </Link>
                    </div>
                </Col>
                <Col xs={"auto"}>
                    <div>
                        <Link to="register">
                            <Button variant="link-btn" className="ms-4 mt-4">Sign in</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}