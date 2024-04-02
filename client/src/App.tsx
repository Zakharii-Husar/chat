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

  const currentUserId = useAppSelector(state => state.loggedInUser.id);
  
  

  useEffect(() => {
    const connectWs = async () => {
      if (!currentUserId) return;
      try {
        if (connection.state === 'Disconnected') {
          await connection.start();
          await connection.invoke("Connect");
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    connectWs();
  
    const disconnectWs = async () => {
      if (connection.state === 'Connected') {
        await connection.stop();
        await connection.invoke("Disconnect");
      }
    };

  
    //gives me error while reloading and doesn't do its job anyway
   // window.addEventListener("beforeunload", disconnectWs);
  
    return () => {
     // window.removeEventListener("beforeunload", disconnectWs);
    };
  }, [currentUserId]);

  useEffect(()=>{
    
    const logData = (data: any) => {
      console.log(data);
    }

    connection.on("ReceiveNewMessage", logData);

    return(()=>{
      connection.off("ReceiveNewMessage", logData);
    })
  }, [])
  

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
