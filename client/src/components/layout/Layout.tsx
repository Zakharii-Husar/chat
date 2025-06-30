import { useOptimizedAuth } from "../../hooks/useOptimizedAuth";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Col, Row, Container } from "react-bootstrap";

export const Layout = () => {
  useOptimizedAuth();

  return (
    <Container fluid className="p-0 w-100 h-100 d-flex justify-content-center">
      <Row className="d-flex w-100 justify-content-center">
        <Col
          xs={12}
          sm={10}
          md={9}
          lg={8}
          xl={7}
          xxl={6}
          className="d-flex flex-column w-100 h-100 p-0"
        >
          <AppHeader />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
