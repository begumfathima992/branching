import { Box, Button, Group } from "@mantine/core";

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <Box
      pos={"absolute"}
      bottom={20}
      left={"50%"}
      sx={{
        transform: "translateX(-50%)",
      }}
    >
      <Group noWrap w={200}>
        <Button
          sx={{ pointerEvents: "none" }}
          bg={step === 1 ? "brand" : "gray.4"}
          fullWidth
          size="xs"
          h={6}
          radius={"xl"}
        />
        <Button
          sx={{ pointerEvents: "none" }}
          bg={step === 2 ? "brand" : "gray.4"}
          fullWidth
          size="xs"
          h={6}
          radius={"xl"}
        />
        <Button
          sx={{ pointerEvents: "none" }}
          bg={step === 3 ? "brand" : "gray.4"}
          fullWidth
          size="xs"
          h={6}
          radius={"xl"}
        />
      </Group>
    </Box>
  );
};

export default ProgressBar;
