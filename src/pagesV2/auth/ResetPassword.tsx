import { Navigate, useParams } from "react-router-dom";
import { ResetPasswordForm } from "../../componentsV2/auth/ResetPasswordForm";

const ResetPassword = () => {
  const { token } = useParams() as { token: string };
  if (!token) {
    return <Navigate to={`/`} />;
  }

  return <ResetPasswordForm token={token} />;
};

export default ResetPassword;
