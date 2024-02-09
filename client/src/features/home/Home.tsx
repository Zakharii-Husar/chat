import Users from "../users/Users";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { Welcome } from "./Welcome";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Home: React.FC = () => {
    const { id: loggedInUserId } = useAppSelector(state => state.auth.response);
    return (
        <Container fluid className="d-flex flex-column align-items-center vw-100">
            {loggedInUserId ? <Users /> : <Welcome />}
        </Container>
    )
}