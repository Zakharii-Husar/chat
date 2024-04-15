import { getSignalRConnection } from "./signalRConnection";
import { useEffect } from "react";
import { useAppSelector } from "../useAppSelectorAndDispatch";

const useWsConnection = () => {
  const connection = getSignalRConnection();
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);
  useEffect(() => {
    const connectWs = async () => {
      try {
        if (currentUserId && connection.state === "Disconnected") {
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
};

export default useWsConnection;
