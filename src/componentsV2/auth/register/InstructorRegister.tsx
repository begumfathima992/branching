import { Box, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { languages } from "../../../constants/data";
import useCustomForm from "../../../hooks/useCustomForm";
import { useAppSelector } from "../../../store/hooks";
import { useRegisterMutation } from "../../../store/slices/authApiSlice";
import { IRegisterParams } from "../../../types/IAuth";
import { ValidateAge } from "../../../utils/ValidateAge";
import { objectPurifier } from "../../../utils/objectPurifier";
import { handleResponse } from "../../../utils/responseHandler";
import { validateField } from "../../../utils/validateField";
import { FileDropZone } from "../../FileDropZone";
import VerifyEmailPopup from "../VerifyEmailPopup";
import BottomButtons from "./BottomButtons";

const InstructorRegister = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  const [register, { isLoading }] = useRegisterMutation();
  const { registerUser } = useAppSelector((state) => state.auth);
  const { cities } = useAppSelector((state) => state.user);
  const [instructingLicence, setInstructingLicence] = useState<
    string | ArrayBuffer | null
  >(null);
  const [vechileNumber, setVechileNumber] = useState<
    string | ArrayBuffer | null
  >(null);
  const [licenceName, setLicenceName] = useState<string | ArrayBuffer | null>(
    null
  );

  const [uploadError, setUploadError] = useState<string | null>(null);

  const { render, form } = useCustomForm({
    initialValues: {
      dob: null,
      licence: "",
      experience: "",
      price: "",
      car_model: "",
      languages: ["english"],
      cities: [],
      has_own_vehicle: "no",
    },
    inputfields: {
      dob: {
        type: "date",
        placeholder: "Date of Birth",
        rightSection: <FaRegCalendar />,
      },
      licence: {
        type: "text",
        placeholder: "Licence No.",
      },
      experience: {
        type: "number",
        placeholder: "Experience in years",
      },
      price: {
        type: "number",
        placeholder: "Price per hour (in canadian $).",
      },
      has_own_vehicle: {
        type: "radioGroup",
        defaultValue: "yes",
        label: "Do you have vechile? :",
        styles: () => ({
          root: {
            display: "flex",
            flexGrow: 1,
            columnGap: 15,
            gridColumn: "1/ span 2",
          },
          label: {
            color: "#000",
            fontWeight: 600,
          },
        }),
        values: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      languages: {
        type: "multiselect",
        placeholder: "Language Spoken",
        data: languages,
      },
      car_model: {
        type: "text",
        placeholder: "Car Model*",
      },
      cities: {
        type: "multiselect",
        placeholder: "Select cities you operate in",
        data: cities ? cities.data : [],
        searchable: true,
        styles: () => ({
          root: {
            gridColumn: "1/ span 2",
          },
        }),
      },
    },
    validate: {
      car_model: (value) => validateField({ value }),
      dob: (value) => ValidateAge(value),
      experience: (value) => validateField({ value }),
      has_own_vehicle: (value) => validateField({ value }),
      languages: (value) => validateField({ value }),
      licence: (value) => validateField({ value }),
      price: (value) => validateField({ value }),
      cities: (value) => validateField({ value }),
    },
    cols: 2,
    submitBtn: false,
    validateInputOnBlur: true,
  });
  const handleSumit = async () => {
    if (!vechileNumber || !instructingLicence || !licenceName) {
      setUploadError("please provide the related files");
      return;
    }
    const data = {
      ...form.values,
      instructing_license: instructingLicence!,
      vehicle_number: vechileNumber!,
      license_name: licenceName!,
      has_own_vehicle: form.values.has_own_vehicle === "yes" ? true : false,
      dob: new Date(form.values.dob!).toISOString(),
      price: form.values.price,
    };
    const res = await register({
      ...objectPurifier(data),
      ...objectPurifier(registerUser as IRegisterParams),
    });
    handleResponse(res, {
      onSuccess: () => open(),
    });
  };
  return (
    <>
      <VerifyEmailPopup onClose={close} opened={opened} />
      <Box ta={"left"}>
        <Text fz={36} fw={600}>
          Continue as{" "}
          <Text component="span" tt={"capitalize"}>
            Instructor
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
          {form.values.has_own_vehicle === "yes" && (
            <FileDropZone
              errroMessage={uploadError}
              setImage={setVechileNumber}
              title="Upload License Plate"
            />
          )}
          <FileDropZone
            errroMessage={uploadError}
            setImage={setLicenceName}
            title="Upload Driving License"
          />
          <FileDropZone
            errroMessage={uploadError}
            setImage={setInstructingLicence}
            title="Upload Instructing License"
          />
          <BottomButtons
            btnText="Submit"
            type="submit"
            goBack={() => setStep(2)}
            isLoading={isLoading}
          />
        </Stack>
      </form>
    </>
  );
};

export default InstructorRegister;
