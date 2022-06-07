import Cookies from "js-cookie";
import { io } from "socket.io-client";
import config from "./config";

let client = null;
const getSocketClient = () => {
  let _client = client;
  if (!_client) {
    const authToken = Cookies.get("token");
    const { webSocketUrl } = config();
    _client = io(`${webSocketUrl}`, {
      transports: ["websocket"],
      query: {
        authorization: authToken,
      },
    });
    client = _client;
  }

  return _client;
};

export default getSocketClient;
