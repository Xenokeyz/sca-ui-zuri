import { useLogout } from "../hooks/use-logout.hook";

export const LogoutButton = () => {
  return (
    <button className="logout-button" onClick={useLogout()}>
      logout
    </button>
  );
};
