import { IRole } from "../../../types/IAuth";
import InstructorRegister from "./InstructorRegister";
import LearnerRegister from "./LearnerRegister";

const Step3 = ({
  setStep,
  role,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  role: IRole;
}) => {
 
  return (
    <>
      {role === "INSTRUCTOR" ? (
        <InstructorRegister setStep={setStep} />
      ) : (
        <LearnerRegister setStep={setStep} />
      )}
    </>
  );
};

export default Step3;
