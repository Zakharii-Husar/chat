import "bootstrap/dist/css/bootstrap.min.css";
import { ChatsOverview } from "./components/messaging/chatsOverview/ChatsOverview";
import { CurrentChat } from "./components/messaging/currentChat/CurrentChat";
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import User from "./components/users/User";
import { Root } from "./components/root/Root";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useInit } from "./hooks/useInit";

function App() {
  
  useInit();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatsOverview />} />
        <Route path="/chats/:chatId" element={<CurrentChat />} />
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
