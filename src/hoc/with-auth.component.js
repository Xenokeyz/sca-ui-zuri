import { Navigate } from "react-router-dom";

export const WithAuth = (Component) => {
  return (props) => {
    const { user } = props;
    if (!user) {
      return <Navigate replace to="/" />;
    }

    return <Component {...props} />;
  };
};
