import { ChatsOverview } from "../components/messaging/chatsOverview/ChatsOverview";
import { CurrentChat } from "../components/messaging/currentChat/CurrentChat";
import { Home } from "../components/home/Home";
import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";
import Users from "../components/users/Users";
import User from "../components/users/User";
import { Layout } from "../components/layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import PATH from "./pathConstants";

const router = createBrowserRouter([
  {
    path: PATH.index,
    element: <Layout />,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      {
        path: PATH.index,
        index: true,
        element: <Home />,
      },
      {
        path: PATH.chats,
        element: <ChatsOverview />,
      },
      {
        path: PATH.currentChat,
        element: <CurrentChat />,
      },
      {
        path: PATH.users,
        element: <Users />,
      },
      {
        path: PATH.userProfile,
        element: <User />,
      },
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
    ],
  },
]);

export default router;
