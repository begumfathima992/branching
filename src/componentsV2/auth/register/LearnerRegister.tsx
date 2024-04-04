import {
  Box,
  NumberInputProps,
  SelectProps,
  Stack,
  Text,
  TextInputProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaRegCalendar } from "react-icons/fa";
import useCustomForm from "../../../hooks/useCustomForm";
import { useAppSelector } from "../../../store/hooks";
import { useRegisterMutation } from "../../../store/slices/authApiSlice";
import { ValidateAge } from "../../../utils/ValidateAge";
import { objectPurifier } from "../../../utils/objectPurifier";
import { handleResponse } from "../../../utils/responseHandler";
import { validateField } from "../../../utils/validateField";
import VerifyEmailPopup from "../VerifyEmailPopup";
import BottomButtons from "./BottomButtons";

const selectLabelStyles: (
  | SelectProps
  | TextInputProps
  | NumberInputProps
)["styles"] = (theme) => ({
  label: {
    fontSize: "0.8rem",
    color: theme.colors.gray[7],
    fontWeight: 500,
  },
});

const selectData = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const LearnerRegister = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  const [register, { isLoading }] = useRegisterMutation();


  const { registerUser } = useAppSelector((state) => state.auth);

  const { render, form } = useCustomForm({
    initialValues: {
      dob: null,
      has_own_vehicle: "",
      has_g1_completed: "",
      license_name: "",
      vehicle_number: "",
    },
    inputfields: {
      has_own_vehicle: {
        type: "select",
        label: "Do you have your own vehicle?",
        styles: selectLabelStyles,
        placeholder: "select one",
        data: selectData,
      },
      has_g1_completed: {
        type: "select",
        placeholder: "select one",
        label: "Have you completed the G1 level?",
        styles: selectLabelStyles,
        data: selectData,
      },
      license_name: {
        type: "select",
        label: "License required",
        data: [
          { label: "G", value: "G" },
          { label: "G2", value: "G2" },
        ],
        styles: selectLabelStyles,
        placeholder: "Enter your license required",
      },
      vehicle_number: {
        type: "text",
        label: "License plate",
        styles: selectLabelStyles,
        placeholder: "Enter license plate if you have own car ",
      },
      dob: {
        type: "date",
        styles: selectLabelStyles,
        label: "Date of Birth",
        placeholder: "Enter your date of birth",
        rightSection: <FaRegCalendar />,
      },
    },
    validate: {
      dob: (value) => ValidateAge(value),
      license_name: (value) => validateField({ value }),
      vehicle_number: (value) => validateField({ value }),
      has_g1_completed: (value) => validateField({ value }),
      has_own_vehicle: (value) => validateField({ value }),
    },
    submitBtn: false,
    cols: 2,
    withLabel: true,
    validateInputOnBlur: true,
  });

  const handleSumit = async () => {
    const data = {
      ...objectPurifier(registerUser),
      ...objectPurifier(form.values),
      has_own_vehicle: form.values.has_own_vehicle === "yes" ? true : false,
      has_g1_completed: form.values.has_g1_completed === "yes" ? true : false,
      vehicle_number: form.values.vehicle_number,
      dob: new Date(form.values.dob as unknown as string).toISOString(),
    };

    const res = await register(data);
    handleResponse(res, {
      onSuccess: () => open(),
    });
  };

  return (
    <>
      <VerifyEmailPopup opened={opened} onClose={close} />
      <Box ta={"left"}>
        <Text fz={36} fw={600}>
          Continue as{" "}
          <Text component="span" tt={"capitalize"}>
            Learner
          </Text>
        </Text>
        <Text c={"secondary"} fz={15}>
          Take the first step towards a more confident and responsible driving
          experience. We look forward to welcoming you to drivetestpros
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(handleSumit)}>
        <Stack pt={30} spacing={20}>
          {render}
          {/* <FileDropZone
            errroMessage={uploadError}
            mt={15}
            setImage={setVechileNumber}
            label="Upload Your Vechile Number*"
          /> */}
          <BottomButtons
            btnText="Submit"
            type="submit"
            isLoading={isLoading}
            goBack={() => setStep(2)}
          />
        </Stack>
      </form>
    </>
  );
};

export default LearnerRegister;
