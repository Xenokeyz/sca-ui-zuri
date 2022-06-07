import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import $api from "../shared/api";

export const useAppLogic = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = jsCookie.get("token");
    let authTokenInterceptor;
    let authErrorHandlerInterceptor;
    if (token) {
      authTokenInterceptor = $api.$axios.interceptors.request.use((config) => {
        return {
          ...config,
          headers: {
            ...(config?.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        };
      });
      authErrorHandlerInterceptor = $api.$axios.interceptors.response.use(
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
    }

    return () => {
      $api.$axios.interceptors.request.eject(authTokenInterceptor);
      $api.$axios.interceptors.response.eject(authErrorHandlerInterceptor);
    };
  }, [user]);

  useEffect(() => {
    const token = jsCookie.get("token");
    if (token) {
      setLoading(true);
      $api
        .$get("/users/me")
        .then(({ data }) => setUser(data))
        .catch(() => {
          /* user not logged in */
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { user, setUser, loading };
};
