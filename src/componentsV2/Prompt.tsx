import { Box, BoxProps } from "@mantine/core";

export const Prompt = ({
  text,
  ...props
}: { text?: React.ReactNode } & Partial<BoxProps>) => {
  return (
    <Box
      pos={"sticky"}
      top={0}
      bg={"tertiary"}
      py={10}
      ta={"center"}
      fz={{ xs: 12, base: 10 }}
      fw={600}
      sx={{ zIndex: 10 }}
      px={{ xs: 0, base: 15 }}
      display={"block"}
      {...props}
    >
      {text ||
        "Driving instructors and Learners come together to enhance Learner's driving test journey."}
    </Box>
  );
};
