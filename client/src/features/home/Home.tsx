import Users from "../users/Users";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { Welcome } from "./Welcome";

import Container from "react-bootstrap/Container";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export const Home: React.FC = () => {
    useCheckAuth();
    const loggedInId = useAppSelector(state => state.currentUser.id);


    return (
        <Container fluid className="d-flex flex-column align-items-center vw-100">
            {loggedInId ? <Users /> : <Welcome />}
        </Container>
    )
}