import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  List,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  createStyles,
  getStylesRef,
} from "@mantine/core";
import { FcApproval } from "react-icons/fc";
import { GiShakingHands } from "react-icons/gi";
import { HiTrophy } from "react-icons/hi2";
import { IoBatteryHalfSharp } from "react-icons/io5";
import { LiaDumbbellSolid } from "react-icons/lia";
import { MdPhoneIphone, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ITrackLearners } from "../../types/IInstructor";
import { getAvatarName } from "../../utils/getAvatarName";
import { LikeIcon } from "../LikeIcon";

const useStyles = createStyles((theme) => ({
  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    ":hover": {
      transition: "all 0.3s ease-in",
      borderColor: theme.colors.brand,
      [`& .${getStylesRef("button")}`]: {
        background: theme.colors.brand,
        color: "#fff",
      },
    },
  },
  button: {
    ref: getStylesRef("button"),
    transition: "all 0.3s ease-in",
  },
}));

export const LearnerCard = ({ data }: { data: ITrackLearners }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Paper pb={10} withBorder radius={"md"} className={classes.cardWrapper}>
      <Box>
        <Group py={10} noWrap position="apart" px={10} align="flex-start">
          <Group noWrap spacing={10} align="center">
            <Avatar
              radius={"xl"}
              color="brand"
              variant="outline"
              src={data.profile_picture}
            >
              {getAvatarName(data.learner_name)}
            </Avatar>
            <Box>
              <Group spacing={5}>
                <Text fw={500} c={"secondary"}>
                  {data.learner_name}
                </Text>
                <Tooltip
                  label={
                    <Group spacing={5}>
                      <FcApproval /> verified
                    </Group>
                  }
                >
                  <ThemeIcon c="green.6" bg="transparent">
                    <MdVerified />
                  </ThemeIcon>
                </Tooltip>
              </Group>
              <Group noWrap spacing={5}>
                <HiTrophy color="#F6B817" />
                <Text fz={12} c={"gray.7"}>
                  {data.has_g1_completed ? "G2" : "G"} level Student ,{" "}
                  {data.has_exam_booked && "Exam Booked"}
                </Text>
              </Group>
            </Box>
          </Group>
          <LikeIcon />
        </Group>
        <Divider />
        <Stack spacing={13} px={10} py={15}>
          <Group fz={12} spacing={5} c="gray.7" noWrap>
            <GiShakingHands size={"1rem"} />
            <Text fw={600}>Class Completed: </Text>
            <Badge
              variant="light"
              color="green"
              radius={0}
              sx={(theme) => ({
                border: `1px solid ${theme.colors.green[6]}`,
              })}
            >
              {data.feedback.class_completed}
            </Badge>
          </Group>
          {data?.feedback?.strength && data?.feedback?.strength?.length > 0 && (
            <Group fz={12} spacing={5} c="gray.7" noWrap>
              <LiaDumbbellSolid size={"1rem"} />
              <Text fw={600}>Strength: </Text>
              {data?.feedback?.strength?.length > 2 ? (
                <Group noWrap spacing={5}>
                  {data?.feedback?.strength.slice(0, 2).map((s, i) => (
                    <Tooltip key={i} label={s}>
                      <Badge
                        bg={"gray.1"}
                        c="gray.6"
                        radius={0}
                        sx={(theme) => ({
                          border: `1px solid ${theme.colors.gray[2]}`,
                        })}
                      >
                        {s?.length > 10 ? s.substring(0, 10) + "..." : s}
                      </Badge>
                    </Tooltip>
                  ))}
                  <Tooltip
                    disabled={!data || data.feedback?.strength.length === 0}
                    multiline
                    label={
                      <List c="#fff" spacing={5} fz={12} listStyleType="square">
                        {data.feedback?.strength.slice(2).map((c, i) => (
                          <List.Item key={i}>{c}</List.Item>
                        ))}
                      </List>
                    }
                  >
                    <Badge
                      bg={"gray.1"}
                      c="gray.6"
                      radius={0}
                      sx={(theme) => ({
                        border: `1px solid ${theme.colors.gray[2]}`,
                      })}
                    >
                      +{data?.feedback?.strength.slice(2).length}
                    </Badge>
                  </Tooltip>
                </Group>
              ) : (
                data?.feedback?.strength.map((s, i) => (
                  <Tooltip key={i} label={s}>
                    <Badge
                      bg={"gray.1"}
                      c="gray.6"
                      radius={0}
                      sx={(theme) => ({
                        border: `1px solid ${theme.colors.gray[2]}`,
                      })}
                    >
                      {s.length > 10 ? s.substring(0, 10) + "..." : s}
                    </Badge>
                  </Tooltip>
                ))
              )}
            </Group>
          )}
          {data?.feedback?.weakness && data?.feedback?.weakness?.length > 0 && (
            <Group fz={12} spacing={5} c="gray.7" noWrap align="center">
              <IoBatteryHalfSharp size={"1rem"} />
              <Text fw={600}>Weakness: </Text>
              {data?.feedback?.weakness.length > 2 ? (
                <Group noWrap spacing={5}>
                  {data?.feedback?.strength?.slice(0, 2).map((s, i) => (
                    <Tooltip key={i} label={s}>
                      <Badge
                        bg={"gray.1"}
                        c="gray.6"
                        radius={0}
                        sx={(theme) => ({
                          border: `1px solid ${theme.colors.gray[2]}`,
                        })}
                      >
                        {s.length > 10 ? s.substring(0, 10) + "..." : s}
                      </Badge>
                    </Tooltip>
                  ))}
                  <Tooltip
                    disabled={!data || data.feedback?.weakness.length === 0}
                    multiline
                    label={
                      <List c="#fff" spacing={5} fz={12} listStyleType="square">
                        {data.feedback?.weakness?.slice(2).map((c, i) => (
                          <List.Item key={i}>{c}</List.Item>
                        ))}
                      </List>
                    }
                  >
                    <Badge
                      bg={"gray.1"}
                      c="gray.6"
                      radius={0}
                      sx={(theme) => ({
                        border: `1px solid ${theme.colors.gray[2]}`,
                      })}
                    >
                      +{data?.feedback?.weakness?.slice(2).length}
                    </Badge>
                  </Tooltip>
                </Group>
              ) : (
                data?.feedback?.weakness?.map((s, i) => (
                  <Tooltip key={i} label={s}>
                    <Badge
                      bg={"gray.1"}
                      c="gray.6"
                      radius={0}
                      sx={(theme) => ({
                        border: `1px solid ${theme.colors.gray[2]}`,
                      })}
                    >
                      {s.length > 10 ? s.substring(0, 10) + "..." : s}
                    </Badge>
                  </Tooltip>
                ))
              )}
            </Group>
          )}
        </Stack>
      </Box>
      <Divider />
      <Group position="apart" noWrap px={10} pt={10}>
        <Group>
          <Tooltip label={`call: ${data.learner_phone}`}>
            <ActionIcon
              bg={"transparent"}
              sx={(theme) => ({
                border: `1px dashed ${theme.colors.brand[0]}`,
                ":hover": {
                  background: theme.colors.gray[2],
                },
              })}
              c="brand"
              radius={"xl"}
              component="a"
              href={`tel:${data.learner_phone}`}
            >
              <MdPhoneIphone />
            </ActionIcon>
          </Tooltip>
          {/* <Tooltip label={`email: ${data.learner_email}`}>
            <ActionIcon
              bg={"transparent"}
              sx={(theme) => ({
                border: `1px dashed ${theme.colors.brand[0]}`,
                ":hover": {
                  background: theme.colors.gray[2],
                },
              })}
              c="brand"
              radius={"xl"}
              component="a"
              href={`mailto:${data.learner_email}`}
            >
              <MdOutlineMail />
            </ActionIcon>
          </Tooltip> */}
        </Group>
        <Button
          onClick={() =>
            navigate(`/instructor/track-students/${data.learner_id}`, {
              state: {
                title: "Track Learner Details",
                withBackBtn: true,
                examBooked: data.has_exam_booked,
                g1Completed: data.has_g1_completed,
              },
            })
          }
          className={classes.button}
          variant="outline"
          size="xs"
          fw={600}
        >
          EDIT DETAILS
        </Button>
      </Group>
    </Paper>
  );
};
