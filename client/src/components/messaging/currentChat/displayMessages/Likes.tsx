import { IUser } from "../../../../redux/slices/Interfaces";
import Avatar from "../../../reusable/Avatar/Avatar";

const Likes: React.FC<{ users: IUser[] }> = ({ users }) => {
  return (
    <ul className="likes-list">
      <li className="likes-header">Liked by:</li>
      {users.map((user) => (
        <li key={user.id} className="like-item">
          <Avatar size="XS" fileName={user.avatarName} isGroup={false} />
          <span>{user.userName}</span>
        </li>
      ))}
    </ul>
  );
};

export default Likes;
