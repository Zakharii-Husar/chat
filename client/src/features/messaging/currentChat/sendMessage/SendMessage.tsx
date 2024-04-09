import { MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import { setMessageContent } from "../../../../state/sendMessageSlice";
import sendMessageThunk from "../../../../thunks/sendMessageThunk";
import { connection } from "../../../ws/wsConnection";
import { useState, useEffect } from "react";

export const SendMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const messageToSend = useAppSelector((state) => state.sendMessage);
  const currentChat = useAppSelector((state) => state.currentChat);
  const currentUser = useAppSelector((state) => state.loggedInUser);

  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const isStillMember = currentChat.members.some(
    (member) => member.memberId === currentUser.id
  );

  const isConnected = connection.state === 'Connected';

  useEffect(()=>{
    
    const showTyping = (data: string[]) => {
      setTypingUsers(data.filter(uname=> uname !== currentUser.userName));
    }
    connection.on("TypingUsers", showTyping);

    return(()=>{
      connection.off("TypingUsers", showTyping);
    })
  }, [])

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageContent(e.target.value));
  };

  const send = () => {
    if (messageToSend.Content && messageToSend.Content.length > 0)
      dispatch(sendMessageThunk());
    dispatch(setMessageContent(""));
  };
  const handleFocus = () => {
    if (!isConnected) return;
    connection
      .invoke("StartTyping", currentChat.chatId, currentUser.userName)
      .catch((err) => console.error("Error invoking StartTyping method:", err));
  };

  const handleBlur = () => {
    if (!isConnected) return;
    connection
    .invoke("StopTyping", currentChat.chatId, currentUser.userName)
    .catch((err) => console.error("Error invoking StartTyping method:", err));
  };

  return !isStillMember ? null : (
    <div>
      {typingUsers.length > 0 && <span>{typingUsers[0] + " is typing..."}</span>}
      <div className="d-flex bg-white mb-3">
        <MDBTextArea
          onFocus={handleFocus}
          onBlur={handleBlur}
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
