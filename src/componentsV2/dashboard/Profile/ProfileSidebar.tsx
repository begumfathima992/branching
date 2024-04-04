import {
  Paper,
  Group,
  Avatar,
  Box,
  ThemeIcon,
  Divider,
  Stack,
  Alert,
  Text,
} from "@mantine/core";
import React from "react";
import { GrCircleAlert } from "react-icons/gr";
import { MdVerified } from "react-icons/md";
import { getAvatarName } from "../../../utils/getAvatarName";
import { EditInstrutorProfileIconIcon } from "../Instructor/EditInstrutorProfileIconIcon";

type ProfileSidebarProps = {
  profile: string | null;
  name: string | null;
  isVerified?: boolean;
  price?: number | null;
  alertmsg?: boolean;
  caption?: React.ReactNode;
  editIcon?: boolean;
};

export const ProfileSidebar = ({
  name,
  profile,
  alertmsg = true,
  caption,
  isVerified,
  editIcon = true,
  price,
}: ProfileSidebarProps) => {
  return (
    <>
      {alertmsg && (
        <Stack w={"100%"} display={{ md: "none", base: "flex" }}  spacing={10}>
          <Alert
            icon={<GrCircleAlert size={"1rem"} />}
            color="yellow"
            title="NOTE"
          >
            some fields may not be available to update
          </Alert>
        </Stack>
      )}
      <Paper
        display={{ md: "block", base: "none" }}
        withBorder
        h={"100%"}
        radius={5}
        p={20}
      >
        <Group position="apart" align="flex-start" noWrap>
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
              {price ? (
                <Text c={"gray.7"} fz={13}>
                  ${price}/hr
                </Text>
              ) : (
                caption
              )}
            </Box>
          </Group>
          {editIcon && (
            <EditInstrutorProfileIconIcon sx={{ pointerEvents: "none" }} />
          )}
        </Group>
        <Divider my={20} />
        {alertmsg && (
          <Stack pt={10} spacing={10}>
            <Alert
              icon={<GrCircleAlert size={"1rem"} />}
              color="yellow"
              title="NOTE"
            >
              some fields may not be available to update
            </Alert>
          </Stack>
        )}
      </Paper>
    </>
  );
};
