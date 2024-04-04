import {
  Box,
  Button,
  Divider,
  Grid,
  MultiSelect,
  NumberInput,
  Paper,
  Skeleton,
  Stack,
  Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocation, useParams } from "react-router-dom";

import { Group } from "@mantine/core";
import { useEffect } from "react";
import { HiTrophy } from "react-icons/hi2";
import { ProfileSidebar } from "../../../componentsV2/dashboard/Profile/ProfileSidebar";
import { useAddTrackLearnerDetailsMutation } from "../../../store/slices/instructorApiSlice";
import { useLeanerByIdQuery } from "../../../store/slices/learnerApiSlice";
import { handleResponse } from "../../../utils/responseHandler";

const selectOptions = [
  "Left Turn",
  "Right Turn",
  "Lane Changes",
  "Steering Control",
  "Gear Shifting",
  "Driving Skill",
  "Traffic Rules and Regulations",
  "Parking Skill",
  "Driving Etiquettes",
  "Signaling and Communication",
  "Knowledge of the Law",
];

export const TrackLearnerDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data, isLoading, isFetching } = useLeanerByIdQuery({
    learner_id: Number(id),
  });

  const [addDetails, { isLoading: addingDetails }] =
    useAddTrackLearnerDetailsMutation();

  const form = useForm({
    initialValues: {
      class_completed: data?.learner?.feedback?.class_completed || "",
      weakness: data?.learner?.feedback?.weakness || [],
      strength: data?.learner?.feedback?.strength || [],
    },
  });

  useEffect(() => {
    form.setFieldValue(
      "class_completed",
      data?.learner?.feedback?.class_completed as number
    );
    form.setFieldValue(
      "strength",
      data?.learner?.feedback?.strength as string[]
    );
    form.setFieldValue(
      "weakness",
      data?.learner?.feedback?.weakness as string[]
    );
  }, [data]);

  const caption = (
    <Group noWrap spacing={5}>
      <HiTrophy color="#F6B817" />
      <Text fz={12} c={"gray.7"}>
        {state.g1Completed ? "G" : "G2"} level Student,{" "}
        {state.examBooked && "Exam Booked"}
      </Text>
    </Group>
  );

  return (
    <Grid align="stretch" p={20}>
      <Grid.Col span={4}>
        {isLoading || isFetching ? (
          <Skeleton h={450} w={"100%"} />
        ) : (
          data && (
            <ProfileSidebar
              editIcon={false}
              name={data?.learner.full_name}
              caption={caption}
              alertmsg={false}
              profile={data?.learner.profile_picture}
            />
          )
        )}
      </Grid.Col>
      <Grid.Col md={8} span={12}>
        <Paper withBorder radius={5} p={15}>
          {isLoading || isFetching ? (
            Array(3)
              .fill(0)
              .map((_, i) => <Skeleton key={i} w={"100%"} h={40} mb={10} />)
          ) : (
            <form
              onSubmit={form.onSubmit(async (values) => {
                const res = await addDetails({
                  learner_id: Number(id),
                  ...values,
                });
                handleResponse(res);
              })}
            >
              <Stack>
                <NumberInput
                  {...form.getInputProps("class_completed")}
                  label="Class Completed"
                  placeholder="enter classes completed"
                />
                <MultiSelect
                  label="Strengths"
                  {...form.getInputProps("strength")}
                  placeholder="select strengths"
                  data={selectOptions.map((val) => ({
                    label: val,
                    value: val,
                  }))}
                />
                <MultiSelect
                  label="Weakness"
                  {...form.getInputProps("weakness")}
                  placeholder="select weakness"
                  data={selectOptions.map((val) => ({
                    label: val,
                    value: val,
                  }))}
                />
              </Stack>
              <Box pt={50}>
                <Divider mb={10} />
                <Button
                  type="submit"
                  loading={addingDetails}
                  display={"block"}
                  ml={"auto"}
                >
                  Update
                </Button>
              </Box>
            </form>
          )}
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
