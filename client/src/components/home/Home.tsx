import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { Welcome } from "./Welcome";
import { Auth } from "./Auth";

import Container from "react-bootstrap/Container";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export const Home: React.FC = () => {
  useCheckAuth();
  const loggedInId = useAppSelector((state) => state.loggedInUser.id);

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vw-100">
      {loggedInId ? <Welcome /> : <Auth />}
    </Container>
  );
};
