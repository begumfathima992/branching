import { Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ILearnerProfile } from "../../../types/ILearner";
import { DetailsLayout } from "../Instructor/DetailsLayout";
import { EditInstrutorProfileIconIcon } from "../Instructor/EditInstrutorProfileIconIcon";

export const LearnerPreferences = ({ data }: { data: ILearnerProfile }) => {
  const navigate = useNavigate();

  const details = [
    {
      label: "G1 Completed",
      content: data.learner.has_g1_completed ? "Yes" : "No",
    },
    {
      label: "License Required",
      content: data.learner.license_name,
    },
    {
      label: "Own Vechile",
      content: data.learner.has_own_vehicle ? "Yes" : "No",
    },
    {
      label: "Exam Booked",
      content: data.learner.has_exam_booked ? "Yes" : "No",
    },
  ];
  return (
    <Paper withBorder radius={5} p={10}>
      <Group noWrap position="apart">
        <Text fz={18} fw={500}>
          Preferences{" "}
        </Text>
        <EditInstrutorProfileIconIcon
          onClick={() =>
            navigate("/dashboard/profile/preference", {
              state: { title: "Profile Edit", withBackBtn: true },
            })
          }
        />
      </Group>
      <Divider my={10} />
      <Stack spacing={13}>
        {details.map((d, i) => (
          <DetailsLayout key={i} {...d} />
        ))}
      </Stack>
      {/* {(data.learner.vehicle_number || data.learner.dl_number) && (
        <Stack>
          <Divider my={10} />
          {data.learner.vehicle_number && (
            <Box>
              <Text fz={14} fw={500} c={"secondary"}>
                Vechile Registration
              </Text>
              <Anchor href={data.learner.vehicle_number} target="_blank">
                {data.learner.vehicle_number}
              </Anchor>
            </Box>
          )}
          {data.learner.dl_number && (
            <Box>
              <Text fz={14} fw={500} c={"secondary"}>
                Driving Licence
              </Text>
              <Anchor href={data.learner.dl_number} target="_blank">
                {data.learner.dl_number}
              </Anchor>
            </Box>
          )}
        </Stack>
      )} */}
    </Paper>
  );
};
