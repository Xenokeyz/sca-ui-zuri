import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import $api from "../shared/api";
import { useFormHandlers } from "./use-form-handlers.hook";
import { useSocket } from "./use-socket.hook";

export const useSingleChatPageLogic = () => {
  const params = useParams();
  const messageContainerRef = useRef();
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [sender, setSender] = useState();
  const [messages, setMessages] = useState([]);
  const onSubmit = async (values) => {
    try {
      if (!values.message) {
        return;
      }
      const { data } = await $api.$post(`/users/messages/${params.id}`, values);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const { handleChange, handleSubmit, values } = useFormHandlers({
    onSubmit,
    initialValues: { message: "" },
  });
  const handleFocus = () => {
    socket?.emit("IS_TYPING", sender?.id);
  };
  const handleBlur = () => {
    socket?.emit("STOPPED_TYPING", sender?.id);
  };

  useEffect(() => {
    if (params.id) {
      $api
        .$get(`/users/messages/${params.id}`)
        .then(({ data }) => setMessages(data))
        .catch(() => {
          /** error getting messages */
        });
      $api
        .$get(`/users/${params.id}`)
        .then(({ data }) => setSender(data))
        .catch(() => {
          /** error getting sender */
        });
    }
  }, [params]);

  useEffect(() => {
    if (messageContainerRef.current) {
      const element = messageContainerRef.current;
      element.scrollTo(0, element.scrollHeight);
    }
  }, [messageContainerRef, messages]);

  useEffect(() => {
    if (socket) {
      socket.on("USER_UPDATE", (data) => {
        if (data.id === sender?.id) {
          setSender(data);
        }
      });
      socket.on("IS_TYPING", (data) => {
        if (data.id === sender?.id) {
          setIsTyping(true);
        }
      });
      socket.on("STOPPED_TYPING", (data) => {
        if (data.id === sender?.id) {
          setIsTyping(false);
        }
      });
      socket.on("NEW_MESSAGE", ({ message, sender: _sender }) => {
        if (_sender.id === sender?.id) {
          setMessages((messages) => [...messages, message]);
        }
      });
      socket.on("USER_DELETE", (user) => {
        if (sender?.id === user.id) {
          window.location = "/chats";
        }
      });
    }

    return () => {
      if (socket && sender) {
        socket?.emit("STOPPED_TYPING", sender?.id);
      }
    };
  }, [socket, sender]);

  return {
    messages,
    sender,
    values,
    messageContainerRef,
    isTyping,
    handleChange,
    handleSubmit,
    handleBlur,
    handleFocus,
  };
};
