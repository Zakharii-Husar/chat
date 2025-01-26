import { RouterProvider } from "react-router-dom";
import { useInit } from "./hooks/useInit";
import router from "./routing/routes";

function App() {
  useInit();

  return (
    <RouterProvider router={router} basename="/projects/chat" />
  );
}

export default App;
