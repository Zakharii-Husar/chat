import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";

import Confirmation from "./Confirmation";
import { RxExit } from "react-icons/rx";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { removeCandidat } from "../chat/newChatSlice";
import rmMemberThunk from "../chat/existingChatSlice";

import { IChatMember } from "../../../features/messaging/messagesInterfaces";
import { useState } from "react";
import rmChatMemberThunk from "../chat/existingChatThunks/rmChatMemberThunk";

const RemoveUsers: React.FC<{ isNewGroup: boolean }> = ({ isNewGroup }) => {
  const dispatch = useAppDispatch();
  const newChat = useAppSelector((state) => state.newChat);
  const existingChat = useAppSelector((state) => state.existingChat);
  const currentUserId = useAppSelector((state) => state.auth.response.id);
  const isCreator = existingChat.members.find(
    (member) => member.memberId === currentUserId
  )?.isCreator;

  const [showList, setShowList] = useState(false);

  //Removes only on the client side during creation of new group
  const rmCandidat = (index: number) => {
    dispatch(removeCandidat(index));
  };

  //Sends request to the server to delete member from existing group
  const rmMember = (memberId: string) => {
    dispatch(rmChatMemberThunk(memberId));
  };

  //Making deletion choice depending if Group is being created or edited
  const remove = (member: IChatMember) => {
    if (isNewGroup) {
      rmCandidat(newChat.members.indexOf(member));
    } else {
      rmMember(member.memberId!);
    }
  };

  const leaveGroup = () => {
    rmMember(currentUserId!);
  };

  const currentMembersList = isNewGroup ? newChat : existingChat;
  return (
    <Container fluid className="d-flex mb-3">
      <Col>
        <Row className={"mb-3 d-" + (isNewGroup ? "none" : "flex")}>
          <span className="d-flex flex-row justify-content-left">
            <Confirmation
              buttonText="Leave group"
              titleText="Do you wanna leave this group?"
              proceed={() => leaveGroup()}
            />
            <RxExit />
          </span>
        </Row>
        <Row className={"d-" + (!isNewGroup && isCreator ? "flex" : "none")}>
          <Button onClick={() => setShowList(!showList)}>
            {showList ? "Cancel" : "Remove members"}
          </Button>
        </Row>
        <Row className="d-flex ">
          <Collapse in={showList || isNewGroup}>
            <div>
              {currentMembersList.members.map((member, i) => {
                return member.memberId === currentUserId ? null : (
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
                        proceed={() => remove(member)}
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

export default RemoveUsers;
