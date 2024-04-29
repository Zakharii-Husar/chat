import { RouterProvider } from "react-router-dom";
import { useInit } from "./hooks/useInit";
import router from "./routing/routes";

function App() {
  useInit();

  return (
      <RouterProvider router={router} />
  );
}

export default App;
