import { Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { EditInstrutorProfileIconIcon } from "../Instructor/EditInstrutorProfileIconIcon";
import { DetailsLayout } from "../Instructor/DetailsLayout";

export type ProfileDetailsProps = {
  label: string;
  content: string | number | string[] | undefined;
};

export const ProfileDetails = ({ data }: { data: ProfileDetailsProps[] }) => {
  const navigate = useNavigate();

  return (
    <Paper withBorder radius={5} p={10}>
      <Group noWrap position="apart">
        <Text fz={18} fw={500}>
          Personal Information
        </Text>
        <EditInstrutorProfileIconIcon
          onClick={() =>
            navigate("/dashboard/profile/edit", {
              state: { title: "Profile Edit", withBackBtn: true },
            })
          }
        />
      </Group>
      <Divider my={10} />
      <Stack spacing={13}>
        {data.map((val, i) => (
          <DetailsLayout key={i} {...val} />
        ))}
      </Stack>
    </Paper>
  );
};
