import jsCookie from "js-cookie";
import { useSearchParams } from "react-router-dom";
import $api from "../shared/api";
import { useFormHandlers } from "./use-form-handlers.hook";

export const useStartPageLogic = (props) => {
  const [searchParams] = useSearchParams();
  const { setUser } = props;
  const onSubmit = async (values) => {
    try {
      const { data } = await $api.$post("/start", values);
      jsCookie.set("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const { handleChange, handleSubmit } = useFormHandlers({ onSubmit });

  return {
    redirect: searchParams.get("redirect") || "/chats",
    handleChange,
    handleSubmit,
  };
};
