import {
  Box,
  Button,
  Divider,
  Loader,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { ProfileUpload } from "../../../componentsV2/ProfileUploader";
import { mailformat } from "../../../constants/data";
import { useAppSelector } from "../../../store/hooks";
import { useUpdateProfileMutation } from "../../../store/slices/authApiSlice";
import { IInstructorProfile } from "../../../types/IInstructor";
import { handleResponse } from "../../../utils/responseHandler";
import { useStateCities } from "../../../utils/useStateCities";
import { validateField } from "../../../utils/validateField";

export const ProfileEdit = ({ data }: { data: IInstructorProfile }) => {
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    data?.data?.profile_picture as string | null
  );
  const [preview, setPreview] = useState<string | null>(
    data?.data?.profile_picture as string | null
  );

  const { states } = useAppSelector((state) => state.user);

  const form = useForm({
    initialValues: {
      fullname: data?.data?.full_name || "",
      dob: new Date(data?.data?.dob) || new Date(),
      email: data?.data?.username || "",
      contact: Number(data?.data?.contact) || "",
      province: data?.data?.province || "",
      country: "canada",
      city: data?.data?.city || "",
      address: data?.data?.address || "",
    },
    validate: {
      contact: (value) => validateField({ value, length: 10 }),
      email: (value) => validateField({ value, reg: mailformat }),
      address: (value) => validateField({ value }),
      city: (value) => validateField({ value }),
      country: (value) => validateField({ value }),
      province: (value) => validateField({ value }),
    },
  });

  const { cities, isLoading } = useStateCities({ state: form.values.province });

  // useEffect(() => {
  //   form.setFieldValue("city", "");
  // }, [form.values.province]);

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

  const handleUpdate = async () => {
    const data = {
      ...form.values,
      contact: String(form.values.contact),
      profile_picture: image as string,
      dob: new Date(form.values.dob).toISOString() as string,
    };
    const res = await updateProfile(data);
    handleResponse(res);
  };

  return (
    <Stack>
      <ProfileUpload
        p={10}
        iconColor="#1D348C"
        handleImageUpload={handleImageUpload}
        preview={preview}
      />
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <SimpleGrid cols={2} px={10}>
          <TextInput
            placeholder="Full Name*"
            disabled
            {...form.getInputProps("fullname")}
          />
          <DateInput
            disabled
            {...form.getInputProps("dob")}
            placeholder="Date of Birth*"
            icon={<FaRegCalendar />}
          />
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder="Email*"
            {...form.getInputProps("email")}
          />
          <NumberInput
            type="number"
            placeholder="Phone No*"
            {...form.getInputProps("contact")}
          />
          <Select
            onClick={() => form.setFieldValue("city", "")}
            {...form.getInputProps("province")}
            data={
              states && states?.data
                ? states.data.states.map((s) => ({
                    label: s.name,
                    value: s.name,
                  }))
                : []
            }
            placeholder="State*"
          />
          <Select
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
          <TextInput
            disabled
            placeholder="Country*"
            {...form.getInputProps("country")}
          />
          <TextInput
            placeholder="Address*"
            {...form.getInputProps("address")}
          />
        </SimpleGrid>
        <Box pt={60}>
          <Divider />
          <Button
            type="submit"
            loading={updating}
            m={10}
            ml={"auto"}
            display={"block"}
          >
            Save
          </Button>
        </Box>
      </form>
    </Stack>
  );
};
