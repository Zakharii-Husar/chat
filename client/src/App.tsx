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
import { connection } from "./features/ws/wsConnection";


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const connectWs = async () => {
      try {
        if (connection.state === 'Disconnected') {
          await connection.start();
          console.log("connected");
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    connectWs();
  
    const disconnectWs = () => {
      if (connection.state === 'Connected') {
        connection.stop();
      }
    };
  
    window.addEventListener("beforeunload", disconnectWs);
  
    return () => {
      window.removeEventListener("beforeunload", disconnectWs);
    };
  }, []);
  

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
