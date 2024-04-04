import {
  Box,
  Button,
  Divider,
  NumberInputProps,
  SelectProps,
  SimpleGrid,
  TextInputProps,
} from "@mantine/core";
import { useState } from "react";
import { ImageUploader } from "../../../componentsV2/ImageUploader";
import {  languages } from "../../../constants/data";
import useCustomForm from "../../../hooks/useCustomForm";
import { useUpdateInstructorMutation } from "../../../store/slices/instructorApiSlice";
import { IInstructorProfile } from "../../../types/IInstructor";
import { handleResponse } from "../../../utils/responseHandler";
import { useAppSelector } from "../../../store/hooks";

const labelStyles: (
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

export const InstructorPreferenceEdit = ({
  data,
}: {
  data: IInstructorProfile;
}) => {
  const [updateInstructor, { isLoading: updating }] =
    useUpdateInstructorMutation();
  const [instructingLicence, setInstructingLicence] = useState<
    string | ArrayBuffer | null
  >(null);
  const [instructingLicencePreview, setInstructingLicencePreview] = useState(
    data?.instructor?.instructing_license as string | null
  );
  const [licenceName, setLicenceName] = useState<string | ArrayBuffer | null>(
    null
  );
  const [licenceNamePreview, setLicenceNamePreview] = useState(
    data?.instructor?.license_name as string | null
  );
  const [vechileNumber, setVechileNumber] = useState<
    string | ArrayBuffer | null
  >(null);
  const [vechileNumberPreview, setVechileNumberPreview] = useState(
    data?.instructor?.vehicle_number as string | null
  );
  const { cities } = useAppSelector((state) => state.user);

  const { render, form } = useCustomForm({
    initialValues: {
      price: data?.instructor?.price || "",
      year_of_exp: data?.instructor?.year_of_exp || "",
      car_model: data?.instructor?.car_model || "",
      has_own_vehicle: data?.instructor?.has_own_vehicle ? "yes" : "no",
      cities: data?.instructor?.cities || [],
      languages: data?.instructor?.languages || [],
      description: data?.instructor?.description || "",
    },
    inputfields: {
      price: {
        type: "number",
        label: "Hourly Rate($)",
        placeholder: "Price*",
        styles: labelStyles,
      },
      year_of_exp: {
        type: "number",
        label: "Experience (Years)",
        placeholder: "experience *",
        styles: labelStyles,
      },
      cities: {
        type: "multiselect",
        label: "Cities Operate*",
        placeholder: "select cities",
        sx: { gridColumn: "1 / span 2" },
        styles: labelStyles,
        searchable: true,
        data: cities
          ? cities?.data.map((c) => ({
              label: c,
              value: c,
            }))
          : [],
      },
      languages: {
        type: "multiselect",
        placeholder: "selet languages",
        label: "Languages Spoken",
        sx: { gridColumn: "1 / span 2" },
        styles: labelStyles,
        data: languages,
      },
      has_own_vehicle: {
        type: "select",
        label: "Do you have your own vehicle?",
        placeholder: "select one",
        styles: labelStyles,
        data: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      car_model: {
        type: "text",
        label: "Car Model",
        placeholder: "Car Model",
        styles: labelStyles,
      },
      description: {
        type: "textarea",
        label: "Descrioption",
        placeholder: "enter description",
        styles: labelStyles,
        minRows: 2,
        sx: { gridColumn: "1 / span 2" },
      },
    },
    submitBtn: false,
    cols: 2,
  });

  const handleUpdate = async () => {
    const data = {
      ...form.values,
      instructing_license: instructingLicence! as string,
      vehicle_number: vechileNumber! as string,
      license_name: licenceName! as string,
      has_own_vehicle: form.values.has_own_vehicle === "yes" ? true : false,
      price: Number(form.values.price),
      year_of_exp: Number(form.values.year_of_exp),
    };
    const res = await updateInstructor(data);
    handleResponse(res);
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Box p={10} pt={20}>
        {render}
      </Box>
      <SimpleGrid p={10} cols={3}>
        <ImageUploader
          label="Vechile Registration"
          preview={vechileNumberPreview}
          setFile={setVechileNumber}
          setPreview={setVechileNumberPreview}
        />
        <ImageUploader
          label="Instructing Licence"
          preview={instructingLicencePreview}
          setFile={setInstructingLicence}
          setPreview={setInstructingLicencePreview}
        />
        <ImageUploader
          label="Driving Licence"
          preview={licenceNamePreview}
          setFile={setLicenceName}
          setPreview={setLicenceNamePreview}
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
  );
};
