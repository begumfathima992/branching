import {
  Box,
  Group,
  Loader,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { mailformat, passwordFormat } from "../../../constants/data";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { registerUser } from "../../../store/slices/authSlice";
import { IRole } from "../../../types/IAuth";
import { useStateCities } from "../../../utils/useStateCities";
import { validateField } from "../../../utils/validateField";
import { ProfileUpload } from "../../ProfileUploader";
import BottomButtons from "./BottomButtons";

const Step2 = ({
  setStep,
  role,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  role: IRole;
}) => {
  const { states } = useAppSelector((state) => state.user);
  const { registerUser: user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<string | ArrayBuffer | null>(
    user.profile_picture || null
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [profileUploadError, setProfileUploadError] = useState<string | null>(
    null
  );

  const form = useForm({
    initialValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
      contact: user?.contact || "",
      country: "canada",
      province: user?.province || "",
      city: user?.city || "",
      suite: "",
      address: user?.address || "",
      password: "",
      confirm_password: "",
    },
    validate: {
      address: (value) => validateField({ value }),
      email: (value) =>
        validateField({ value, reg: mailformat, message: "Invalid email" }),
      city: (value) => validateField({ value }),
      confirm_password: (value, values) =>
        validateField({
          value,
          compareWith: values.password,
          message: "Passwords don't match",
        }),
      password: (value) =>
        validateField({
          value,
          reg: passwordFormat,
          message:
            "password must be 8 to 15 characters long with 1 uppercase, special character and a number",
        }),
      contact: (value) =>
        validateField({ value, length: 10, message: "Invalid phone no." }),
      country: (value) => validateField({ value }),
      fullname: (value) => validateField({ value }),
      province: (value) => validateField({ value }),
    },
  });

  const handleImageUpload = (img: File | null) => {
    const reader = new FileReader();
    let imgUrl;
    if (img) {
      imgUrl = URL.createObjectURL(img);
      setPreview(imgUrl);
    }
    const file = img && img;
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file as File);
  };

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    if (role === "INSTRUCTOR" && image === null) {
      setProfileUploadError("please upload your profile image");
      return;
    }
    setProfileUploadError(null);
    dispatch(
      registerUser({
        ...form.values,
        profile_picture: image as string,
        country: "canada",
        suite: null,
      })
    );
    setStep(3);
  };

  const { cities, isLoading } = useStateCities({ state: form.values.province });

  return (
    <>
      <Box ta={"left"}>
        <Text fz={28} fw={600} c="secondary">
          Continue as{" "}
          {role && (
            <Text component="span" tt={"capitalize"}>
              {role.toLowerCase()}
            </Text>
          )}
        </Text>
        <Text c={"secondary"} fz={15}>
          Take the first step towards a more confident and responsible driving
          experience. We look forward to welcoming you to drivetestpros
        </Text>
      </Box>
      <ProfileUpload
        error={profileUploadError}
        handleImageUpload={handleImageUpload}
        preview={preview}
      />
      <Stack pt={30} spacing={20} align="stretch">
        <Group noWrap>
          <TextInput
            w="100%"
            placeholder="Full Name*"
            type="text"
            {...form.getInputProps("fullname")}
          />
          <NumberInput
            w="100%"
            placeholder="Phone No.*"
            type="number"
            {...form.getInputProps("contact")}
          />
        </Group>
        <TextInput
          type="email"
          placeholder="Email*"
          {...form.getInputProps("email")}
          w="100%"
        />
        <Group noWrap>
          <Select
            size="md"
            readOnly
            data={[{ label: "Canada", value: "canada" }]}
            w="100%"
            placeholder="Country*"
            {...form.getInputProps("country")}
          />
          <Select
            size="md"
            onClick={() => form.setFieldValue("city", "")}
            data={
              states && states?.data
                ? states.data.states.map((s) => ({
                    label: s.name,
                    value: s.name,
                  }))
                : []
            }
            w="100%"
            placeholder="State*"
            {...form.getInputProps("province")}
          />
        </Group>
        <Group noWrap>
          <Select
            size="md"
            readOnly={isLoading}
            rightSection={isLoading && <Loader size={"sm"} />}
            data={
              cities
                ? cities.map((c) => ({
                    label: c,
                    value: c,
                  }))
                : []
            }
            w="100%"
            placeholder="City*"
            {...form.getInputProps("city")}
          />
        </Group>
        <TextInput
          w="100%"
          placeholder="Address*"
          type="text"
          {...form.getInputProps("address")}
        />
        <PasswordInput
          w="100%"
          placeholder="Password*"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          w="100%"
          placeholder="Confirm Password*"
          {...form.getInputProps("confirm_password")}
        />
        <BottomButtons handleSubmit={handleSubmit} goBack={() => setStep(1)} />
      </Stack>
    </>
  );
};

export default Step2;
