import $api from "../shared/api";
import { useSocket } from "./use-socket.hook";

const { useState, useEffect } = require("react");

export const useChatsPageLogic = () => {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    $api
      .$get("/users")
      .then(({ data }) => setUsers(data))
      .catch(() => {
        /** error fetching users */
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("NEW_USER", (user) => {
        user.isOnline = true;
        setUsers([...users, { user }]);
      });
      socket.on("USER_UPDATE", (user) => {
        const clone = [...users].map((_user) => {
          if (_user.user.id === user.id) {
            return { ..._user, user };
          }
          return { ..._user };
        });

        setUsers(clone);
      });
      socket.on("USER_DELETE", (user) => {
        setUsers(users.filter((_user) => _user.user.id !== user.id));
      });
      socket.on("NEW_MESSAGE", ({ message, sender }) => {
        let newUser;
        const newUsers = users.filter((_user) => {
          if (_user.user.id === sender.id) {
            newUser = { ..._user, lastMessage: message, showBadge: true };
            return false;
          }
          return true;
        });

        setUsers([newUser, ...newUsers]);
      });
      socket.on("IS_TYPING", (user) => {
        const clone = [...users].map((_user) => {
          if (_user.user.id === user.id) {
            return { ..._user, isTyping: true };
          }
          return { ..._user };
        });

        setUsers(clone);
      });
      socket.on("STOPPED_TYPING", (user) => {
        const clone = [...users].map((_user) => {
          if (_user.user.id === user.id) {
            return { ..._user, isTyping: false };
          }
          return { ..._user };
        });

        setUsers(clone);
      });
    }
  }, [socket, users]);

  return {
    users: users.filter((user) => user.user.username.includes(search)),
    handleSearch,
  };
};
