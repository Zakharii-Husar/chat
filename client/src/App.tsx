import "bootstrap/dist/css/bootstrap.min.css";
import { ChatsOverview } from "./features/messaging/chatsOverview/ChatsOverview";
import { CurrentChat } from "./features/messaging/currentChat/CurrentChat";
import { Home } from "./features/home/Home";
import { Login } from "./features/auth/login/Login";
import { Register } from "./features/auth/register/Register";
import User from "./features/users/User";
import { Root } from "./features/root/Root";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useAppSelectorAndDispatch";
import getAllChatsThunk from "./thunks/getAllChatsThunk";
import useWsConnection from "./hooks/ws/useWsConnection";
import useWsMsgListener from "./hooks/ws/useWsMsgListener";
import useWsReadListener from "./hooks/ws/useWsReadListener";

function App() {
  useWsConnection();
  useWsMsgListener();
  useWsReadListener();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(state=>state.loggedInUser.id)
  const chatsOverviewState = useAppSelector(state=>state.chats);

  useEffect(() => {
    const initialLoad = () => {
      if (!currentUserId || chatsOverviewState.chats?.length > 1) return;
      dispatch(getAllChatsThunk());
    };
    initialLoad();
  }, [currentUserId, chatsOverviewState]);

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
