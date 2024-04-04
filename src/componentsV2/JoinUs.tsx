import { Stack, Group, Button, Text } from "@mantine/core";

export const JoinUs = () => {
  return (
    <Stack align="center" py={100} bg={"#F0EFFF"} px={{ md: 0, base: 20 }}>
      <Text ta={"center"} ff={"Merriweather"} fz={{ md: 60, sm: 42, base: 32 }}>
        Ready to Get Started?
      </Text>
      <Text
        fz={{ md: 16, base: 14 }}
        ta={"center"}
        w={{ md: "850px", base: "auto" }}
      >
        Choose the plan that suits you best and embark on a journey of safe and
        confident driving education. If you have any questions
      </Text>
      <Group noWrap>
        <Button>GET STARTED</Button>
        <Button>CONTACT US</Button>
      </Group>
    </Stack>
  );
};
