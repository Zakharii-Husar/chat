import { MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useAppSelectorAndDispatch";

import { setMessageContent } from "./newChatSlice";
import sendMessageThunk from "./newChatThunks/sendMessageThunk";

export const MessageInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const newChat = useAppSelector((state) => state.newChat);

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const sendMessage = () => {
    if (
      newChat.messageToSend.Content &&
      newChat.messageToSend.Content.length > 0
    )
      dispatch(sendMessageThunk());
    dispatch(setMessageContent(""));
  };
  return (
    <div>
      <div className="d-flex bg-white mb-3">
        <MDBTextArea
          onChange={handleMessageInput}
          placeholder="Type message..."
          value={newChat.messageToSend.Content ?? ""}
          label="Message"
          id="textAreaExample"
          rows={4}
        />
      </div>
      <MDBBtn onClick={sendMessage} color="info" rounded className="float-end">
        Send
      </MDBBtn>
    </div>
  );
};
