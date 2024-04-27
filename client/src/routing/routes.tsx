import "bootstrap/dist/css/bootstrap.min.css";
import { ChatsOverview } from "../components/messaging/chatsOverview/ChatsOverview";
import { CurrentChat } from "../components/messaging/currentChat/CurrentChat";
import { Home } from "../components/home/Home";
import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";
import User from "../components/users/User";
import { Layout } from "./Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/chats",
        element: <ChatsOverview />,
      },
      {
        path: "/chats:chatId",
        element: <CurrentChat />,
      },
      {
        path: "/chats:chatId",
        element: <CurrentChat />,
      },
      {
        path: "/users/:userName",
        element: <User />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
