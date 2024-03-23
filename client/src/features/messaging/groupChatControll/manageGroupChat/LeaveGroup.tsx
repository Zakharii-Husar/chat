import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { RxExit } from "react-icons/rx";
import Confirmation from "./Confirmation";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import rmChatMemberThunk from "../../thunks/rmChatMemberThunk";

const LeaveGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.response.id);

  const leave = () => {
    dispatch(rmChatMemberThunk(currentUserId!));
  };

  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row>
          <span className="d-flex flex-row justify-content-left">
            <Confirmation
              buttonText="Leave group"
              titleText="Do you wanna leave this group?"
              proceed={() => leave()}
            />
            <RxExit />
          </span>
        </Row>
      </Col>
    </Container>
  );
};

export default LeaveGroup;
