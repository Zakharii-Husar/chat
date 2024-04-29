import { IUser } from "../../../../redux/slices/Interfaces";
import Avatar from "../../../reusable/Avatar/Avatar";

const Likes: React.FC<{ users: IUser[] }> = ({ users }) => {
  return (
    <ul style={{listStyle: "none"}} className="d-flex flex-column p-0 bg-dark text-light w-50">
        <li className="text-info">Liked by:</li>
      {users.map((user) => {
        return (
          <li key={user.id} className="d-flex flex-row border align-items-center w-100">
            <Avatar size="S" fileName={user.avatarName} editBtn={false} isGroup={false}/>
            <span>{user.userName}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Likes;
