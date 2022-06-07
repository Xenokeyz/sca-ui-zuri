import jsCookie from "js-cookie";
import $api from "../shared/api";
import { useSocket } from "./use-socket.hook";

export const useLogout = () => {
  const socket = useSocket();

  return () => {
    socket?.disconnect();
    $api
      .$delete("/stop")
      .then(() => {
        jsCookie.remove("token");
        window.location = "/";
      })
      .catch(() => {
        /*hmmmp*/
      });
  };
};
