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

import { useEffect, useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "./hooks/useAppSelectorAndDispatch";
import { prependChats } from "./state/chatsOverviewSlice";
import { addMessageToChat, markMessagesAsRead } from "./state/currentChatSlice";
import { markChatAsRead } from "./state/chatsOverviewSlice";
import { connection } from "./features/ws/wsConnection";
import { IMessage } from "./state/Interfaces";

function App() {
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  const currentChatId = useAppSelector((state) => state.currentChat.chatId);
  const currentChatIdRef = useRef(currentChatId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  useEffect(() => {
    console.log("Real current chatId: " + currentChatId);
  }, [currentChatId]);
  useEffect(() => {
    const connectWs = async () => {
      if (!currentUserId) return;
      try {
        if (connection.state === "Disconnected") {
          await connection.start();
          await connection.invoke("Connect");
        }
      } catch (err) {
        console.error(err);
      }
    };

    connectWs();

    const disconnectWs = async () => {
      if (connection.state === "Disconnected") return;
      await connection.invoke("Disconnect");
      await connection.stop();
    };

    window.addEventListener("beforeunload", disconnectWs);

    return () => {
      window.removeEventListener("beforeunload", disconnectWs);
    };
  }, [currentUserId]);

  connection.on("ReceiveNewMessage", (data: IMessage) => {
    dispatch(prependChats(data));
    if (data.chatId === currentChatIdRef.current) {
      dispatch(addMessageToChat(data));
    }
  });

  connection.on("MarkChatAsRead", (data: {chatId: number,  username: string}) => {
    dispatch(markChatAsRead(data));
    if (data.chatId === currentChatIdRef.current) {
     dispatch(markMessagesAsRead(data.username))
    }
  });

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
