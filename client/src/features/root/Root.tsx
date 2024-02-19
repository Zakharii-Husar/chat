import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Outlet } from "react-router-dom";
import { MainHeader } from "./MainHeader";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { UserHeader } from "./UserHeader";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";




export const Root = () => {


    useCheckAuth()
    const { loggedIn } = useAppSelector(state => state.auth);

    return (
        <Container fluid className="d-flex flex-column align-items-center vw-100 vh-100"
            style={{ backgroundColor: "grey" }} >
            <Row>
                <Col>
                    <div>
                        <MainHeader />
                    </div>
                </Col>

                <Col className="d-flex flex-column justify-content-around align-items-center h-100" >
                    <div>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}