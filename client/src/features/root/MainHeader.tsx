import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { TiMessages } from 'react-icons/ti'


export const MainHeader: React.FC = () => {
    return (
        <Container fluid className="d-flex justify-content-center vw-100 p-4">
            <Row className="align-items-center">
                <Col className="me-3">
                    <div>
                        <h1 style={{ color: "blue" }} className="text-xl" >Chat</h1>
                    </div>
                </Col >
                <Col className="me-3">
                    <div>
                        <TiMessages size={50} style={{ color: "blue" }} />
                    </div>
                </Col>
                <Col>
                    <div>
                        <h1 style={{ color: "blue" }} className="text-xl" >:)</h1>
                    </div>
                </Col >
            </Row>
        </Container>
    );
};
