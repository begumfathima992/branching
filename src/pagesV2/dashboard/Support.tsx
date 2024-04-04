import {
  Box,
  Button,
  Divider,
  FileInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImagePriviewer } from "../../componentsV2/ImagePreviewer";
import { useSupportMutation } from "../../store/slices/authApiSlice";
import { handleResponse } from "../../utils/responseHandler";
import { validateField } from "../../utils/validateField";
import { toast } from "react-toastify";

export const Support = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [sendMessage, { isLoading }] = useSupportMutation();
  const { getInputProps, values, reset, validate } = useForm({
    initialValues: {
      access_type: "",
      device_type: "",
      reason: "",
    },
    validate: {
      access_type: (value) => validateField({ value }),
      device_type: (value) => validateField({ value }),
      reason: (value) => validateField({ value }),
    },
  });

  const handleSubmit = async () => {
    const hasError = validate().hasErrors;
    if (hasError) return;
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const res = await sendMessage({
      ...values,
      attachment: file as string,
    });
    handleResponse(res, {
      onSuccess: () => {
        reset();
        setPreview(null);
        setFile(null);
      },
    });
  };

  return (
    <Paper m={20} withBorder>
      <Stack mih={"75svh"} justify="space-between">
        <Box p={10}>
          <Stack spacing={5}>
            <Text fw={"500"} c={"secondary.8"}>
              Contact Customer Care
            </Text>
            <Text fz={18} c={"gray.6"}>
              Please fill in the form and describe your issue and submit this
              form for assistance with DriverTestPros
            </Text>
          </Stack>
          <Divider my={20} />
          <Stack>
            <SimpleGrid cols={2}>
              <Select
                {...getInputProps("access_type")}
                placeholder="How do you access DriverTestPros*"
                data={[
                  {
                    label: "Drivering Instructor",
                    value: "driveringInstructor",
                  },
                  {
                    label: "Learner",
                    value: "learner",
                  },
                ]}
              />
              <Select
                {...getInputProps("device_type")}
                placeholder="What device are you using to access DriverTestPros*"
                data={[
                  {
                    label: "Iphone",
                    value: "Iphone",
                  },
                  {
                    label: "Ipad",
                    value: "Ipad",
                  },
                  {
                    label: "Apple Laptop/Desktop",
                    value: "Apple Laptop/Desktop",
                  },
                  {
                    label: "Windows Laptop/Desktop",
                    value: "Windows Laptop/Desktop",
                  },
                  {
                    label: "Android Phone",
                    value: "Adnroid Phone",
                  },
                  {
                    label: "Android Tablet",
                    value: "Android Tablet",
                  },
                  {
                    label: "Other",
                    value: "Other",
                  },
                ]}
              />
            </SimpleGrid>
            <Textarea
              placeholder="Other reasons*"
              {...getInputProps("reason")}
            />
            <FileInput
              accept={"image/png, image/jpg, image/jpeg"}
              placeholder="select file"
              label="Add Atachment"
              onChange={(e) => {
                if (e) {
                  const reader = new FileReader();
                  setPreview(URL.createObjectURL(e as File));
                  reader.onload = () => {
                    setFile(reader.result as string);
                  };
                  reader.readAsDataURL(e);
                }
              }}
              rightSection={
                <Box>
                  <input
                    accept={"image/png, image/jpg, image/jpeg"}
                    onChange={(e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        setPreview(URL.createObjectURL(file));
                        reader.onload = () => {
                          setFile(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    id="file"
                    type="file"
                    style={{
                      display: "none",
                    }}
                  />
                  <label
                    htmlFor="file"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                  >
                    <IoCloudUploadOutline />
                    <Text fz={14}>Upload</Text>
                  </label>
                </Box>
              }
              styles={(theme) => ({
                rightSection: {
                  width: "max-content",
                  padding: "0px 5px",
                  borderLeft: `1px solid ${theme.colors.gray[3]}`,
                },
              })}
            />
            {preview && (
              <ImagePriviewer imgsrc={preview} alt={preview} w={150} />
            )}
          </Stack>
        </Box>
        <Box>
          <Divider />
          <Button
            loading={isLoading}
            ml={"auto"}
            display={"block"}
            onClick={handleSubmit}
            m={10}
          >
            SUBMIT
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
