import Users from "../users/Users";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { Welcome } from "./Welcome";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export const Home: React.FC = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn);
    const response = useAppSelector(state => state.auth.response);
    console.log(response);
    return (
        <Container fluid className="d-flex flex-column align-items-center vw-100">
            {loggedIn ? <Users /> : <Welcome />}
        </Container>
    )
}