import { MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import { setMessageContent } from "../sendMessageSlice";
import sendMessageThunk from "../sendMessageThunk";

export const SendMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const messageToSend = useAppSelector((state) => state.sendMessage);
  const currentChat = useAppSelector((state)=> state.currentChat);
  const currentUserId = useAppSelector((state)=>state.auth.response.id);

  const isStillMember = currentChat.members.some(member=> member.memberId === currentUserId);

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const send = () => {
    if (
      messageToSend.Content &&
      messageToSend.Content.length > 0
    )
      dispatch(sendMessageThunk());
    dispatch(setMessageContent(""));
  };
  
  return !isStillMember ? null : (
    <div>
      <div className="d-flex bg-white mb-3">
        <MDBTextArea
          onChange={handleMessageInput}
          placeholder="Type message..."
          value={messageToSend.Content ?? ""}
          label="Message"
          id="textAreaExample"
          rows={4}
        />
      </div>
      <MDBBtn onClick={send} color="info" rounded className="float-end">
        Send
      </MDBBtn>
    </div>
  );
};
