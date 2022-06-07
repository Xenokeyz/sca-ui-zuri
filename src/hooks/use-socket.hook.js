import { useEffect, useState } from "react";
import getSocketClient from "../shared/socket-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = getSocketClient();

    setSocket(socket);

    return () => {
      setSocket(null);
    };
  }, []);

  return socket;
};
