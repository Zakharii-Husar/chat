import { IUser } from "../../../../Interfaces";
import Avatar from "../../../reusable/Avatar/Avatar";
import { Link } from "react-router-dom";
import PATH from "../../../../routing/pathConstants";

const Likes: React.FC<{ users: IUser[] }> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <Link 
          key={user.id} 
          to={`${PATH.users}/${user.userName}`}
          className="like-item"
        >
          <div className="like-avatar-wrapper">
            <Avatar
              size="XS"
              fileName={user.avatarName ?? null}
              isGroup={false}
            />
          </div>
          <span className="like-name">{user.userName}</span>
        </Link>
      ))}
    </>
  );
};

export default Likes;
