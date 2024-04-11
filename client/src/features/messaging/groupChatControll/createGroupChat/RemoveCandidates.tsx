import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { removeCandidate } from "../../../../state/createGroupSlice";
import { IChatMember } from "../../../../state/Interfaces";

const RemoveCandidates: React.FC = () => {
  const dispatch = useAppDispatch();
  const createGroupState = useAppSelector((state) => state.createGroup);

  const remove = (candidate: IChatMember) => {
    const index = createGroupState.candidates.indexOf(candidate);
    dispatch(removeCandidate(index));
  };

  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row className="d-flex ">
          <div>
            {createGroupState.candidates.map((candidate, i) => {
              return (
                <ListGroup.Item
                  key={i}
                  className="d-flex flex-row justify-content-between align-items-center"
                  style={{
                    margin: 0,
                    padding: "0.5rem",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <span>{candidate.userName} </span>
                  <span
                    onClick={() => remove(candidate)}
                    style={{ cursor: "pointer" }}
                  >
                    x
                  </span>
                </ListGroup.Item>
              );
            })}
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default RemoveCandidates;
