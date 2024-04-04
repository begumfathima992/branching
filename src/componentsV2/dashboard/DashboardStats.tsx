import { Avatar, Group, Paper, Progress, Stack, Text, UnstyledButton } from '@mantine/core';
import React from 'react'
import { IoChevronForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useGetInstructorStatsQuery } from '../../store/slices/instructorApiSlice';
import { useGetLearnerStatsQuery } from '../../store/slices/learnerApiSlice';
import { getAvatarName } from '../../utils/getAvatarName';
import { Svg } from '../svg';

export const DashboardStats = () => {
  const { userDetails , user} = useAppSelector((state) => state.auth);

  const { data: InstructorStats } = useGetInstructorStatsQuery(
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
  const totalBookings =
    userDetails?.role === "INSTRUCTOR"
      ? InstructorStats?.data.total_bookings
      : learnerStats?.data.total_bookings;
  const totalPayments =
    userDetails?.role === "INSTRUCTOR"
      ? InstructorStats?.data.total_earning
      : learnerStats?.data.total_spent;
  const totalUpcomingBookings =
    userDetails?.role === "INSTRUCTOR"
      ? InstructorStats?.data.upcoming_bookings
      : learnerStats?.data.upcoming_bookings;
  return (
    <Stack>
      <Paper p={10} withBorder>
        <Group position="apart" noWrap>
          <Stack spacing={10}>
            <Text c="secondary" fw={600}>
              Complete your profile
            </Text>
            <Link to={"/dashboard/profile"}>
              <UnstyledButton
                display={"flex"}
                sx={{ columnGap: 10, alignItems: "center" }}
                fz={12}
                fw={500}
                tt={"uppercase"}
                c={"brand"}
              >
                open profile <IoChevronForward size={20} />
              </UnstyledButton>
            </Link>
          </Stack>
          <Avatar size={"lg"} radius={"50%"} src={user?.profile_picture}>
            {getAvatarName(user?.full_name)}
          </Avatar>
        </Group>
      </Paper>
      <Paper p={10} withBorder>
        <Group position="apart" noWrap>
          <Stack sx={{ flexGrow: 1 }} spacing={10}>
            <Text c="secondary" fw={600}>
              Total Bookings
            </Text>
            <Group noWrap position="apart" sx={{ flexGrow: 1 }}>
              <Progress w={"100%"} value={Number(totalBookings) / 100} />
              <Text fz={14} c={"secondary"}>
                {totalBookings || 0}
              </Text>
            </Group>
          </Stack>
          <Svg.Contact />
        </Group>
      </Paper>
      <Paper p={10} withBorder>
        <Group position="apart" noWrap>
          <Stack sx={{ flexGrow: 1 }} spacing={10}>
            <Text c="secondary" fw={600}>
              Upcoming Bookings
            </Text>
            <Group noWrap position="apart" sx={{ flexGrow: 1 }}>
              <Progress
                w={"100%"}
                value={Number(totalUpcomingBookings) / 100}
              />
              <Text fz={14} c={"secondary"}>
                {totalUpcomingBookings || 0}
              </Text>
            </Group>
          </Stack>
          <Svg.Calendar />
        </Group>
      </Paper>
      <Paper p={10} withBorder>
        <Group position="apart" noWrap>
          <Stack sx={{ flexGrow: 1 }} spacing={10}>
            <Text c="secondary" fw={600}>
              Total {userDetails?.role === "INSTRUCTOR" ? "Earned" : "Spent"}
            </Text>
            <Group noWrap position="apart" sx={{ flexGrow: 1 }}>
              <Progress w={"100%"} value={Number(totalPayments) / 100} />
              <Text fz={14} c={"secondary"}>
                ${totalPayments || 0}
              </Text>
            </Group>
          </Stack>
          <Svg.Spent />
        </Group>
      </Paper>
    </Stack>
  );
};
