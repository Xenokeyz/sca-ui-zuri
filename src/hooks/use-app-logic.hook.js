import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import $api from "../shared/api";
export const useAppLogic = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = jsCookie.get("token");
    if (token) {
      $api.$axios.interceptors.request.use((config) => {
        return {
          ...config,
          headers: {
            ...(config?.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        };
      });
      $api.$axios.interceptors.response.use(
        (res) => res,
        (error) => {
          if (error.response?.status === 401) {
            jsCookie.remove("token");
            if (user) {
              setUser(null);
            }
          }
          return Promise.reject(error);
        }
      );

      if (!user) {
        $api
          .$get("/users/me")
          .then(({ data }) => setUser(data))
          .catch(() => {
            /* user not logged in */
          })
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  return { user, setUser, loading };
};
