import { useCheckAuth } from "../../hooks/useCheckAuth";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useAppSelector } from '../../hooks/useAppSelectorAndDispatch';
import { IoIosMail } from "react-icons/io";
import { Link } from 'react-router-dom';


export const UserHeader: React.FC = () => {
    useCheckAuth();
    const { nickname } = useAppSelector(state => state.auth.response);

    return (
        <Container fluid className="d-flex justify-content-center vw-100 p-4">
            <Row className="align-items-center">                <Col className="me-3">
                <div>
                    <h1 style={{ color: "blue" }} className="text-xl" >Chat</h1>
                </div>
            </Col >
                <Col className="me-3">
                    <div>
                        <h2>{nickname}</h2>
                    </div>
                </Col>
                <Col>
                    <div style={{ color: "blue" }}>
                        <Link style={{ textDecoration: "none" }} to="/chats">
                            <IoIosMail size="40" />
                        </Link>
                    </div>
                </Col >
            </Row>
        </Container>)
};