import { Grid, Group, Paper, Skeleton, Stack } from "@mantine/core";

const ProfileLodingSkeleton = () => {
  return (
    <Stack>
      <Paper withBorder radius={5} p={10}>
        <Group noWrap spacing={10}>
          <Skeleton height={50} circle />
          <Stack spacing={6}>
            <Skeleton h={5} w={130} />
            <Skeleton h={5} w={130} />
          </Stack>
        </Group>
      </Paper>
      <Grid>
        <Grid.Col md={7} span={12}>
          <Skeleton h={300} w={"100%"} />
        </Grid.Col>
        <Grid.Col md={5} span={12}>
          <Skeleton h={300} w={"100%"} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default ProfileLodingSkeleton;
