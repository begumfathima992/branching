import { Link, useNavigate } from "react-router-dom";
import { IAllInstructor } from "../../../types/IInstructor";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { IoMdBriefcase } from "react-icons/io";
import { MdLocationPin, MdOutlineReviews, MdVerified } from "react-icons/md";
import { getAvatarName } from "../../../utils/getAvatarName";
import { NotFound } from "../../NotFound";

export const CurrentInstructor = ({
  currentInstructor,
}: {
  currentInstructor: IAllInstructor | null | undefined;
}) => {
  const navigate = useNavigate();
  return (
    <Paper withBorder>
      <Group p={10} position="apart" noWrap>
        <Text fz={18} fw={600} c={"secondary"}>
          Instructor
        </Text>
        <Link
          to={"/dashboard/instructors"}
          state={{ title: "Instructors", withBackBtn: false }}
        >
          <Button
            fz={12}
            rightIcon={<FiChevronRight size={"1rem"} />}
            fw={500}
            c={"brand"}
            bg={"transparent"}
            sx={{
              ":hover": {
                background: "transparent",
              },
            }}
            td={"underline"}
          >
            Find another Instructor
          </Button>
        </Link>
      </Group>
      <Divider />
      {!currentInstructor || currentInstructor === undefined ? (
        <NotFound
          h={"30vh"}
          iconSize={100}
          title="You haven't selected your instructor yet"
          caption=" "
        />
      ) : (
        <Box p={10}>
          <SimpleGrid cols={2} sx={{ alignItems: "flex-end" }}>
            <Box>
              <Group py={10} noWrap spacing={8}>
                <Avatar radius={"50%"} src={currentInstructor?.profile_picture}>
                  {getAvatarName(currentInstructor?.name)}
                </Avatar>
                <Box>
                  <Text fz={14} fw={500} c="secondary" tt={"capitalize"}>
                    {currentInstructor?.name}
                  </Text>
                  <Text fz={12} c="gray.7">
                    ${currentInstructor?.price}/hr
                  </Text>
                </Box>
                {currentInstructor?.is_verified && (
                  <ThemeIcon c="green.6" bg="transparent">
                    <MdVerified />
                  </ThemeIcon>
                )}
              </Group>
              <Stack spacing={5}>
                <Group noWrap spacing={5}>
                  <IoMdBriefcase />
                  <Text fz={14} fw={500} c={"secondary"}>
                    Experience :{" "}
                    <Text fz={13} component="span" fw={400} c="gray.7">
                      {currentInstructor?.year_of_exp} Year of Experience
                    </Text>
                  </Text>
                </Group>
                <Group noWrap spacing={5}>
                  <BsFillCarFrontFill />
                  <Text fz={14} fw={500} c={"secondary"}>
                    Car :{" "}
                    <Text fz={13} component="span" fw={400} c="gray.7">
                      {currentInstructor?.car_model}
                    </Text>
                  </Text>
                </Group>
                <Group noWrap spacing={5} align="flex-start">
                  <MdLocationPin />
                  <Text fz={14} fw={500} c={"secondary"}>
                    Cities:{" "}
                    <Tooltip
                      disabled={
                        !currentInstructor ||
                        currentInstructor.cities.length === 0
                      }
                      multiline
                      styles={(theme) => ({
                        tooltip: {
                          background: theme.colors.gray[2],
                        },
                      })}
                      label={
                        <List spacing={5} fz={12} listStyleType="square">
                          {currentInstructor &&
                            currentInstructor.cities.map((c, i) => (
                              <List.Item key={c+i}>{c}</List.Item>
                            ))}
                        </List>
                      }
                    >
                      <Text fw={400} fz={12} c={"gray.6"} component="span">
                        {currentInstructor &&
                        currentInstructor?.cities.length > 2
                          ? currentInstructor?.cities
                              .slice(0, 2)
                              .map((c) =>
                                c.length > 7 ? c.substring(0, 7) + "..." : c
                              )
                              .join(",") +
                            ` ${currentInstructor?.cities.slice(2).length}more`
                          : currentInstructor?.cities.join(",")}
                      </Text>
                    </Tooltip>
                  </Text>
                </Group>
                <Group noWrap spacing={5}>
                  <MdOutlineReviews />
                  <Text fz={14} fw={500} c={"secondary"}>
                    Rating :{" "}
                    <Text fz={13} component="span" fw={400} c="gray.7">
                      ⭐ {currentInstructor?.rating || 0} (
                      {currentInstructor?.feedback.length || 0})
                    </Text>
                  </Text>
                </Group>
              </Stack>
            </Box>
            <Group position="right" noWrap>
              <Button
                fw={600}
                compact
                onClick={() =>
                  navigate(
                    `/instructor-details/${currentInstructor.instructor_id}`,
                    {
                      state: {
                        title: "Instructor Details",
                        withBackBtn: true,
                        opened: true,
                      },
                    }
                  )
                }
              >
                BOOK NOW
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `/instructor-details/${currentInstructor.instructor_id}`,
                    {
                      state: {
                        title: "Instructor Details",
                        withBackBtn: true,
                      },
                    }
                  )
                }
                fw={600}
                variant="outline"
                compact
              >
                VIEW DETAILS
              </Button>
            </Group>
          </SimpleGrid>
        </Box>
      )}
    </Paper>
  );
};
