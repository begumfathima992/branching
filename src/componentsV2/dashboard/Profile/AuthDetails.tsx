import {
  Divider,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { EditInstrutorProfileIconIcon } from "../Instructor/EditInstrutorProfileIconIcon";

export const AuthDetails = () => {
  const navigate = useNavigate();
  return (
    <Paper withBorder radius={5} p={10}>
      <Group noWrap position="apart">
        <Text fz={18} fw={500}>
          Password
        </Text>
        <EditInstrutorProfileIconIcon
          onClick={() =>
            navigate("/dashboard/profile/reset-password", {
              state: { title: "Profile Edit", withBackBtn: true },
            })
          }
        />
      </Group>
      <Divider my={10} />
      <Stack spacing={10}>
        <Grid fw={500} align="center">
          <Grid.Col span={3} fz={14} c={"secondary"}>
            <Text mb={10}>Password</Text>
            {/* <Text>Last Changed</Text> */}
          </Grid.Col>
          <Grid.Col c={"gray.6"} fz={14} span={9}>
            <PasswordInput
              disabled
              bg={"#fff"}
              value={"passwordadfagagadfg"}
              styles={{
                wrapper: {
                  background: "white !important",
                },
                input: {
                  border: "none",

                  background: "transparent !important",
                },
                visibilityToggle: {
                  display: "none",
                },
              }}
            />
            {/* <Text>{new Date().toDateString()}</Text> */}
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
};
