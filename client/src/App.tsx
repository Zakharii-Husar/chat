import "bootstrap/dist/css/bootstrap.min.css";
import { Chats } from "./features/messaging/chats/Chats";
import { Chat } from "./features/messaging/chat/Chat";
import { Home } from "./features/home/Home";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import User from "./features/users/User";
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
        <Route path="/chats/:chatId" element={<Chat />} />
        <Route path="/users/:userName" element={<User />} />
        <Route path="/login" element={<Login />} />
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
