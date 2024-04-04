import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  const isAuthenticated = () => {
    if (token) {
      return true;
    }
    return false;
  };
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
