import { Box, List, Stack, Text } from "@mantine/core";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const list = [
  "Installing safe driving practices for a lifetime of responsible road behavior.",
  "Building students' confidence in navigating diverse driving scenarios.",
  "Influencing students as a model of attentive and law-abiding driving.",
  "Continuously refining your own driving skills through teaching.",
  "Granting students the freedom to explore the world through driving.",
];

const AuthSidebar = () => {
  return (
    <Stack align="flex-start" ta={"left"} pt={30}>
      <Link to="/">
        <Text c={"brand"} fw={600} fz={24}>
          DRIVETESTPROS
        </Text>
      </Link>
      <Box ta={"left"} fz={32} fw={600} c={"secondary"}>
        <Text>Unlock the Secrets of Safe </Text>
        <Text> Driving with Nearby Experts</Text>
      </Box>
      <Text c={"secondary"} fw={600}>
        Take Control of the Wheel! Learn Safe Driving Techniques from Certified
        Nearby Experts. Enroll Today!
      </Text>
      <List
        spacing={10}
        listStyleType="none"
        icon={<BsCheckCircleFill />}
        styles={(theme) => ({
          itemIcon: {
            color: theme.colors.tertiary,
          },
          item: {
            fontSize: "0.85rem",
            color: theme.colors.secondary,
          },
        })}
      >
        {list.map((l, i) => (
          <List.Item key={i}>{l}</List.Item>
        ))}
      </List>
      <Box pt={20}>
        <img
          src="/images/auth.jpg"
          style={{
            height: "60%",
            width: "60%",
            margin: "auto",
            display: "block",
          }}
          alt="login"
        />
      </Box>
    </Stack>
  );
};

export default AuthSidebar;
