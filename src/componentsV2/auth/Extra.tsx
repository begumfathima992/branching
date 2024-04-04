import { Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

type ExtraProps = {
  extraText: string;
  href: string;
  btnText: string;
};

const Extra = ({ extraText, href, btnText }: ExtraProps) => {
  return (
    <Stack spacing={30} align="stretch">
      {/* <Text
        pos={"relative"}
        sx={(theme) => ({
          "::after": {
            content: "''",
            height: "2px",
            width: "45%",
            background: theme.colors.gray[4],
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "0",
          },
          "::before": {
            content: "''",
            height: "2px",
            width: "45%",
            background: theme.colors.gray[4],
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "0",
          },
        })}
        c={"gray.7"}
        align="center"
        mt="md"
        size="md"
      >
        or
      </Text> */}
      {/* <Button
        size="lg"
        fw={400}
        fullWidth
        variant="outline"
        color="gray.4"
        c={"gray.6"}
      >
        <Group>
          <FcGoogle />
          Continue with Google
        </Group>
      </Button> */}
      <Group position="center" spacing={5} c="secondary">
        {extraText}
        <Link to={href}>
          <Text fw={600} c={"brand"} tt={"capitalize"}>
            {btnText}
          </Text>
        </Link>
      </Group>
    </Stack>
  );
};

export default Extra;
