import { IMessage } from "../../../../redux/slices/Interfaces";

const GenericMessage: React.FC<{ message: IMessage }> = ({ message }) => {
  return (
    <li className="border p-2" key={message.chatId}>
      <div className="d-flex flex-column">
        <p
          style={{ overflowWrap: "break-word", flexShrink: 0 }}
          className="small text-danger"
        >
          {message.content}
        </p>
      </div>
    </li>
  );
};

export default GenericMessage;
