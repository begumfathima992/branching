import {
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { IInstructorProfileById } from "../../types/IInstructor";
import { getAvatarName } from "../../utils/getAvatarName";
import Badges from "../Badges";

const InstructorInfo = ({
  setOpened,
  data,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  data: IInstructorProfileById;
}) => {
  return (
    <Paper withBorder radius={"md"} p={20}>
      <Stack>
        <InstructorInfoHeader data={data} setOpened={setOpened} />
        <Stack>
          <Stack spacing={5}>
            <Text fz={14} fw={500} c={"gray.7"}>
              Address
            </Text>
            <Text fz={14} fw={500}>
              {data.instructor.address}
            </Text>
          </Stack>
          <Stack spacing={5}>
            <Text fz={14} fw={500} c={"gray.7"}>
              Country
            </Text>
            <Text fz={14} fw={500}>
              {data.instructor.country}
            </Text>
          </Stack>
          <Stack spacing={5}>
            <Text fz={14} fw={500} c={"gray.7"}>
              City
            </Text>
            <Text fz={14} fw={500}>
              {data.instructor.city}
            </Text>
          </Stack>
          <Stack spacing={5}>
            <Text fz={14} fw={500} c={"gray.7"}>
              Rate per hour
            </Text>
            <Text fz={14} fw={500}>
              ${data.instructor.price}/hr
            </Text>
          </Stack>
          <Stack spacing={5}>
            <Text fz={14} fw={500} c={"gray.7"}>
              Languages
            </Text>
            <Group spacing={5} c="secondary" fz={13}>
              {data.instructor.languages.map((l, i) => (
                <Badges.Default text={l} key={i} />
              ))}
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

const InstructorInfoHeader = ({
  setOpened,
  data,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  data: IInstructorProfileById;
}) => {
  const connect = [
    { caption: "call", icon: <BiPhoneCall />, href: data.instructor.contact },
    // { caption: "text", icon: <FiMessageSquare /> },
    {
      caption: "email",
      icon: <AiOutlineMail />,
      href: data.instructor.username,
    },
  ];
  return (
    <Stack align="center">
      <Avatar radius={"xl"} src={data.instructor.profile_picture} size={"lg"}>
        {getAvatarName(data.instructor.full_name)}
      </Avatar>
      <Box ta={"center"}>
        <Text fw={600}>{data.instructor.full_name}</Text>
        {data.instructor.is_verified && (
          <Group position="center" spacing={0}>
            <ThemeIcon c="green.6" bg="transparent">
              <MdVerified />
            </ThemeIcon>
            <Text fz={12} c={"gray.6"}>
              Verified
            </Text>
          </Group>
        )}
      </Box>
      <Group position="center">
        {connect.map((c, i) => (
          <Stack align="center" spacing={5} key={i}>
            <ThemeIcon
              bg={"gray.1"}
              radius={"xl"}
              size={"lg"}
              c="secondary"
              sx={(theme) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                cursor: "pointer",
              })}
              {...(c.href && {
                onClick: () => {
                  if (c.caption === "call") {
                    window.location.href = `tel:${c.href}`;
                  } else if (c.caption === "email") {
                    window.location.href = `mailto:${c.href}`;
                  }
                },
              })}
            >
              {c.icon}
            </ThemeIcon>
            <Text tt={"capitalize"} fz={12} c={"gray.6"}>
              {c.caption}
            </Text>
          </Stack>
        ))}
      </Group>
      <Button fullWidth size="lg" onClick={() => setOpened((prev) => !prev)}>
        Book Now
      </Button>
    </Stack>
  );
};

export default InstructorInfo;
