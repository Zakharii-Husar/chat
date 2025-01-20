import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import PATH from "../../routing/pathConstants";
import { FaUsers, FaUserCog, FaComments } from "react-icons/fa";
import "./Welcome.scss";

export const Welcome: React.FC = () => {
  const currentUname = useAppSelector((state) => state.loggedInUser.userName);

  return (
    <div className="welcome">
      <div className="welcome__container">
        <h1 className="welcome__title">Welcome to Chat App</h1>
        <div className="welcome__nav">
          <Link to={PATH.users} className="welcome__link">
            <FaUsers className="icon" />
            <span>All Users</span>
          </Link>
          
          <Link to={PATH.users + "/" + currentUname} className="welcome__link">
            <FaUserCog className="icon" />
            <span>My Profile</span>
          </Link>
          
          <Link to={PATH.chats} className="welcome__link">
            <FaComments className="icon" />
            <span>My Chats</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
