import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";
import { ListGroup } from "react-bootstrap";
import { removeCandidat } from "../chat/newChatSlice";
import { removeMember } from "../chat/existingChatSlice";

import { IChatMember } from "../../../app/userInterfaces";

const AddedUsers: React.FC<{ isNewGroup: boolean }> = ({isNewGroup}) => {
  const dispatch = useAppDispatch();
  const newChat = useAppSelector((state) => state.newChat);
  const existingChat = useAppSelector(state=> state.existingChat)

  //Removes only on the client side during creation of new group
  const rmCandidat = (index: number) => {
    dispatch(removeCandidat(index));
  };

  //Sends request to the server to delete member from existing group
  const rmMember = (member: IChatMember) => {
    dispatch(removeMember(member))
  };

  //Making deletion choice depending if Group is being created or edited
  const remove = (member: IChatMember) =>{
    if(isNewGroup){
        rmCandidat(newChat.members.indexOf(member));
    }else{
        rmMember(member)
    }
  };
  

  const currentMembersList = isNewGroup ? newChat : existingChat;
  return (
    <div className="d-flex flex-wrap mb-3">
      {currentMembersList.members.map((member, i) => {
        return (
          <ListGroup.Item
            key={i}
            className="d-flex justify-content-between align-items-center"
            style={{
              margin: 0,
              padding: "0.5rem",
              border: "1px solid #dee2e6",
            }}
          >
            <span
              onClick={() =>
                remove(member)
              }
            >
              {member.userName} <span style={{ cursor: "pointer" }}>×</span>
            </span>
          </ListGroup.Item>
        );
      })}
    </div>
  );
};

export default AddedUsers;
