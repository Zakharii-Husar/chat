import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./Header";
import { Col, Row, Container } from "react-bootstrap";

export const Layout = () => {
  useCheckAuth();

  return (
    <Container fluid className="d-flex justify-content-center h-100">
      <Row>
        <Col className="d-flex flex-column w-100 h-100 p-0"
        >
          <AppHeader />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
