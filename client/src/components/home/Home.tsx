import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { Welcome } from "./Welcome";
import { Auth } from "./Auth";

export const Home: React.FC = () => {
  const loggedInId = useAppSelector((state) => state.loggedInUser.id);

  return (
    <div className="home-container">
      {loggedInId ? <Welcome /> : <Auth />}
    </div>
  );
};
