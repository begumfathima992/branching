import { useLocation, useNavigate } from "react-router-dom";
import { PaymentSuccesModal } from "../../Modals/PaymentSuccesModal";
import { DashboardBanner } from "../../componentsV2/dashboard/DashboardBanner";
import { DashboardBody } from "../../componentsV2/dashboard/DashboardBody";
import { useAppSelector } from "../../store/hooks";

export const Dashboard = () => {
  const path = useLocation();
  const { userDetails } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      {userDetails?.role === "LEARNER" &&
        path?.search &&
        path?.search.includes("succeeded") && (
          <PaymentSuccesModal onExit={() => navigate("/dashboard")} />
        )}
      <DashboardBanner />
      <DashboardBody />
    </>
  );
};
