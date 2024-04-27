import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";

export const Welcome: React.FC = () => {
  const currentUname = useAppSelector((state) => state.loggedInUser.userName);
  return (
    <>
      <h1>Welcome</h1>
      <Link to="/users">All Users</Link>
      <Link to={"/users/" + currentUname}>Manage profile</Link>
      <Link to="/chats">My Chats</Link>
    </>
  );
};
