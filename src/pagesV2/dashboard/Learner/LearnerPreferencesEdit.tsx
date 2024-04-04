import { Box, Button, Divider } from "@mantine/core";
import useCustomForm from "../../../hooks/useCustomForm";
import { useUpdateLearnerMutation } from "../../../store/slices/learnerApiSlice";
import { ILearnerProfile } from "../../../types/ILearner";
import { handleResponse } from "../../../utils/responseHandler";
const selectData = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const LearnerPreferencesEdit = ({ data }: { data: ILearnerProfile }) => {
  const [updateLeaner, { isLoading }] = useUpdateLearnerMutation();

  // const [drivingLicence, setDrivingLicence] = useState<
  //   string | ArrayBuffer | null
  // >(null);
  // const [drivingLicencePreview, setDrivingLicencePreview] = useState(
  //   data?.learner?.vehicle_number as string | null
  // );
  // const [vechileNumber, setVechileNumber] = useState<
  //   string | ArrayBuffer | null
  // >(null);
  // const [vechileNumberPreview, setVechileNumberPreview] = useState(
  //   data?.learner?.dl_number as string | null
  // );
  const { render, form } = useCustomForm({
    initialValues: {
      has_own_vehicle: data.learner.has_own_vehicle ? "yes" : "no" || "",
      has_g1_completed: data.learner.has_own_vehicle ? "yes" : "no" || "",
      license_name: data.learner.license_name || "",
      has_exam_booked: data.learner.has_exam_booked ? "yes" : "no" || "",
    },
    inputfields: {
      has_own_vehicle: {
        type: "select",
        label: "Do you have your own vehicle?",
        placeholder: "select one",
        data: selectData,
      },
      has_g1_completed: {
        type: "select",
        placeholder: "select one",
        label: "Have you completed the G1 level?",
        data: selectData,
      },
      license_name: {
        type: "select",
        label: "Licence Required",
        data: [
          { label: "G", value: "G" },
          { label: "G2", value: "G2" },
        ],
        placeholder: "Enter your license required",
      },
      has_exam_booked: {
        type: "select",
        placeholder: "select one",
        label: "Have you Booked your exam?",
        data: selectData,
      },
    },
    submitBtn: false,
    cols: 2,
  });

  const handleUpdate = async () => {
    const data = {
      ...form.values,
      // vehicle_number: vechileNumber! as string,
      // dl_number: drivingLicence! as string,
      has_g1_completed: form.values.has_g1_completed === "yes" ? true : false,
      has_exam_booked: form.values.has_exam_booked === "yes" ? true : false,
      has_own_vehicle: form.values.has_own_vehicle === "yes" ? true : false,
    };
    const res = await updateLeaner(data);
    handleResponse(res);
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Box p={10} pt={40}>
        {render}
      </Box>
      {/* <SimpleGrid p={10} cols={3}>
        <ImageUploader
          label="Vechile Registration"
          preview={vechileNumberPreview}
          setFile={setVechileNumber}
          setPreview={setVechileNumberPreview}
        />
        <ImageUploader
          label="Driving Licence"
          preview={drivingLicencePreview}
          setFile={setDrivingLicence}
          setPreview={setDrivingLicencePreview}
        />
      </SimpleGrid> */}
      <Box pt={60}>
        <Divider />
        <Button
          type="submit"
          loading={isLoading}
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
