import "bootstrap/dist/css/bootstrap.min.css";
import { Chats } from "./features/chats/Chats";
import { Chat } from "./features/chat/Chat";
import { Home } from "./features/home/Home";
import { Auth } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import { Root } from "./features/root/Root";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route
          path="/chats/:id"
          element={<Chat />}
          loader={() => "api_loader_request"}
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
