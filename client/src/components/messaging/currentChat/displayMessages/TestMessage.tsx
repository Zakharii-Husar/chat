import { IMessage } from "../../../../redux/slices/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { useAppSelector } from "../../../../hooks/useAppSelectorAndDispatch";

const TestMessage: React.FC<{ message: IMessage }> = ({ message }) => {
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const isSender = message.senderId === currentUser.id;
  
  const time = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: isSender ? 'flex-end' : 'flex-start',
      padding: '8px',
      width: '100%'
    }}>
      <div style={{
        background: isSender ? '#e6e6e6' : '#ffffff',
        padding: '12px',
        borderRadius: '8px',
        maxWidth: '70%',
        minWidth: '200px'
      }}>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>
            {isSender ? "You" : message.senderUserName}
          </span>
        </div>
        
        <div style={{ wordBreak: 'break-word' }}>
          {message.content}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          fontSize: '12px',
          marginTop: '4px',
          color: '#666'
        }}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default TestMessage;
