import 'bootstrap/dist/css/bootstrap.min.css';
import { Chats } from './features/chats/Chats';
import { Chat } from './features/chat/Chat';
import { Home } from './features/home/Home';
import { Auth } from './features/auth/Auth';
import { Register } from './features/register/Register';
import { Root } from './features/root/Root';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";




function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route path="/" element={<Home />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/:chatId" element={<Chat />} />
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
};



export default App;
