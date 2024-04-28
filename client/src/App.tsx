import { RouterProvider } from "react-router-dom";
import { useInit } from "./hooks/useInit";
import router from "./routing/routes";
import { Container } from "react-bootstrap";

function App() {
  useInit();

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
