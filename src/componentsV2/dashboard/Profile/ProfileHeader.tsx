import { Avatar, Box, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { MdVerified } from "react-icons/md";
import { getAvatarName } from "../../../utils/getAvatarName";

type ProfileHeaderProps = {
  profile: string | null;
  name: string | null;
  isVerified?: boolean;
  price?: number | null;
  email?: string | null;
};

export const ProfileHeader = ({
  isVerified,
  name,
  profile,
  email,
  price,
}: ProfileHeaderProps) => {
  return (
    <Paper withBorder radius={5} p={10}>
      <Group position="apart" align="flex-start">
        <Group noWrap spacing={10}>
          <Avatar size={"lg"} src={profile} radius={"xl"}>
            {getAvatarName(name)}
          </Avatar>
          <Box>
            <Group spacing={5}>
              <Text fw={500} fz={20}>
                {name}
              </Text>
              {isVerified && (
                <ThemeIcon c="green.6" bg="transparent">
                  <MdVerified />
                </ThemeIcon>
              )}
            </Group>
            <Text c={"gray.7"} fz={13}>
              {price ? `$${price}/hr` : email}
            </Text>
          </Box>
        </Group>
        {/* <EditInstrutorProfileIconIcon
          onClick={() =>
            navigate("/dashboard/profile/edit", {
              state: { title: "Profile Edit", withBackBtn: true },
            })
          }
        /> */}
      </Group>
    </Paper>
  );
};
