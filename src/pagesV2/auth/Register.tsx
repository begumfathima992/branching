import { useState } from "react";
import ProgressBar from "../../componentsV2/auth/register/ProgressBar";
import Step1 from "../../componentsV2/auth/register/Step1";
import Step2 from "../../componentsV2/auth/register/Step2";
import Step3 from "../../componentsV2/auth/register/Step3";
import { IRole } from "../../types/IAuth";
import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("" as IRole);

  if (token !== null) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {step === 1 && <Step1 setStep={setStep} role={role} setRole={setRole} />}
      {step === 2 && <Step2 setStep={setStep} role={role} />}
      {step === 3 && <Step3 setStep={setStep} role={role} />}
      <ProgressBar step={step} />
    </>
  );
};

export default Register;
