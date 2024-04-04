import { Group, Paper, PaperProps, Skeleton, Stack } from "@mantine/core";

export const CardLoadingSkeleton = (props: PaperProps) => {
  return (
    <Paper py={20} w={"100%"} h={220} px={10} bg={"#fff"} radius={"md"}>
      <Group noWrap spacing={5} align="center">
        <Skeleton radius={"xl"} h={45} w={45} />
        <Stack spacing={5} sx={{ flexGrow: 1 }}>
          <Skeleton h={5} w={"80%"} />
          <Skeleton h={5} w={"80%"} />
        </Stack>
      </Group>
      <Skeleton w={"100%"} h={2} radius={0} my={10} />
      <Stack pt={10} spacing={5} sx={{ flexGrow: 1 }}>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton h={5} radius={0} key={i} />
          ))}
      </Stack>
    </Paper>
  );
};
