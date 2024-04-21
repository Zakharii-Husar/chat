import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import Confirmation from "./Confirmation";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import rmChatMemberThunk from "../../../../thunks/rmChatMemberThunk";

const RemoveMembers: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const isCreator = currentUserId == currentChat.adminId;



  const [showList, setShowList] = useState(false);

  const remove = (userName: string) => {
    dispatch(rmChatMemberThunk(userName));
  };

  useEffect(()=>{
    console.log(currentChat.members)
  }, [currentChat])

  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row className={"d-" + (isCreator ? "flex" : "none")}>
          <Button onClick={() => setShowList(!showList)}>
            {showList ? "Cancel" : "Remove members"}
          </Button>
        </Row>
        <Row className="d-flex ">
          <Collapse in={showList}>
            <div>
              {currentChat.members.map((member, i) => {
                return member.id === currentUserId ? null : (
                  <ListGroup.Item
                    key={i}
                    className="d-flex flex-row justify-content-between align-items-center"
                    style={{
                      margin: 0,
                      padding: "0.5rem",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    <span>{member.userName} </span>
                    <span style={{ cursor: "pointer" }}>
                      <Confirmation
                        buttonText="x"
                        titleText={`Remove ${member.userName} from the chaat?`}
                        proceed={() => remove(member.userName!)}
                      />
                    </span>
                  </ListGroup.Item>
                );
              })}
            </div>
          </Collapse>
        </Row>
      </Col>
    </Container>
  );
};

export default RemoveMembers;
