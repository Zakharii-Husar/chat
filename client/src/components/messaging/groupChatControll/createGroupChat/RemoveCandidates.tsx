import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";

import { removeCandidate } from "../../../../redux/slices/createGroupSlice";
import { IChatMember } from "../../../../Interfaces";
import { ListGroup } from "react-bootstrap";
import "./RemoveCandidates.scss";

const RemoveCandidates: React.FC = () => {
  const dispatch = useAppDispatch();
  const createGroupState = useAppSelector((state) => state.createGroup);

  const remove = (candidate: IChatMember) => {
    const index = createGroupState.candidates.indexOf(candidate);
    dispatch(removeCandidate(index));
  };

  return (
    <div className="remove-candidates">
      <ListGroup className="remove-candidates__list">
        {createGroupState.candidates.map((candidate, i) => (
          <ListGroup.Item
            key={i}
            className="remove-candidates__item"
          >
            <span>{candidate.userName}</span>
            <span 
              className="remove-candidates__remove"
              onClick={() => remove(candidate)}
            >
              ×
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RemoveCandidates;
