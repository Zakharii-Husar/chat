import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { useOptimizedAuth } from "../../hooks/useOptimizedAuth";
import { Welcome } from "./Welcome";
import { Auth } from "./Auth";
import Loading from "../reusable/Loading";

// Loading component with animated dots
const LoadingDots: React.FC = () => (
  <div className="loading-dots">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
);

export const Home: React.FC = () => {
  const { isAuthenticated, isLoading } = useOptimizedAuth();
  const loggedInId = useAppSelector((state) => state.loggedInUser.id);

  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="home-container">
        <Loading centered />
      </div>
    );
  }

  return (
    <div className="home-container">
      {isAuthenticated ? <Welcome /> : <Auth />}
    </div>
  );
};
