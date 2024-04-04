import {
  Paper,
  Group,
  Avatar,
  Box,
  Flex,
  ThemeIcon,
  Divider,
  Stack,
  Text,
} from "@mantine/core";
import { MdVerified } from "react-icons/md";
import { getAvatarName } from "../../utils/getAvatarName";
import { useAppSelector } from "../../store/hooks";
import {
  useInstructorProfileQuery,
  useGetInstructorStatsQuery,
} from "../../store/slices/instructorApiSlice";
import {
  useGetLearnerStatsQuery,
  useLeanerByIdQuery,
} from "../../store/slices/learnerApiSlice";
import Badges from "../Badges";

export const UserDetails = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  const { data: learner } = useLeanerByIdQuery(
    { learner_id: Number(userDetails?.learner_id) },
    {
      skip: userDetails?.role === "INSTRUCTOR",
    }
  );
  const { data: instructor } = useInstructorProfileQuery(undefined, {
    skip: userDetails?.role === "LEARNER",
  });

  const { data: instructorStats } = useGetInstructorStatsQuery(
    userDetails?.instructor_id as number,
    {
      skip: userDetails?.role === "LEARNER",
    }
  );
  const { data: learnerStats } = useGetLearnerStatsQuery(
    userDetails?.learner_id as number,
    {
      skip: userDetails?.role === "INSTRUCTOR",
    }
  );
  const instructorPersonalInfo = {
    "Experience (Years)": (
      <Text fz={14} c={"secondary"}>
        {instructor?.instructor.year_of_exp}
      </Text>
    ),
    "Total learners": (
      <Text fz={14} c={"secondary"}>
        {instructorStats?.data?.total_learner}
      </Text>
    ),
    "Classes completed": (
      <Text fz={14} c={"secondary"}>
        {instructorStats?.data?.class_completed}
      </Text>
    ),
  };
  const learnerPersonalInfo = {
    "License Required": (
      <Text fz={14} c={"secondary"}>
        {learner?.learner.has_g1_completed ? "G" : "G2"}
      </Text>
    ),
    "Classes Completed": (
      <Text fz={14} c={"secondary"}>
        {learnerStats?.data.class_completed}
      </Text>
    ),
    Strengths: (
      <Group spacing={5}>
        {learner?.learner?.feedback?.strength?.map((s) => (
          <Badges.Default key={s} text={s} />
        ))}
      </Group>
    ),
    Weakness: (
      <Group spacing={5}>
        {learner?.learner?.feedback?.weakness?.map((s) => (
          <Badges.Default key={s} text={s} />
        ))}
      </Group>
    ),
  };
  const userinfo =
    userDetails?.role === "LEARNER" ? learner?.learner : instructor?.instructor;
  const userPersonalInfo: {
    [key: string]: JSX.Element;
  } =
    userDetails?.role === "LEARNER"
      ? learnerPersonalInfo
      : instructorPersonalInfo;
  return (
    <Paper p={10} withBorder>
      <Group spacing={10} noWrap>
        <Avatar radius={"50%"} size={"lg"} src={userinfo?.profile_picture}>
          {getAvatarName(userinfo?.full_name)}
        </Avatar>
        <Box>
          <Flex columnGap={2} align={"center"}>
            <Text tt={"capitalize"} fw={700} c="secondary">
              {userinfo?.full_name}
            </Text>
            {userDetails?.is_verified && (
              <ThemeIcon c="green.6" bg="transparent">
                <MdVerified />
              </ThemeIcon>
            )}
          </Flex>
          <Text fz={12} c="gray.7">
            {userinfo?.address}
          </Text>
        </Box>
      </Group>
      <Divider my={10} />
      <Text fz={18} fw={600}>
        Personal Information
      </Text>
      <Stack pt={20}>
        {Object.keys(userPersonalInfo).map((key, index) => (
          <Group position="apart" key={index}>
            <Text fz={14} c={"secondary"}>
              {key}
            </Text>
            {userPersonalInfo[key]}
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};
