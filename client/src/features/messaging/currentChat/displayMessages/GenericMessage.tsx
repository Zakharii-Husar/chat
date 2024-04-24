import { IMessage } from "../../../../state/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { MDBIcon } from "mdb-react-ui-kit";
import Avatar from "../../../users/Avatar";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { TiDelete } from "react-icons/ti";
import markMsgAsDeletedThunk from "../../../../thunks/markMsgAsDeletedThunk";

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
