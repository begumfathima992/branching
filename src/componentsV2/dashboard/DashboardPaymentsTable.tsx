import {
  Avatar,
  Box,
  Divider,
  Group,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import {
  useInstructorPaymentStatsQuery,
  useGetInstructorStatsQuery,
} from "../../store/slices/instructorApiSlice";
import {
  useGetLeanerPaymentsStatsQuery,
  useGetLearnerStatsQuery,
} from "../../store/slices/learnerApiSlice";
import { getAvatarName } from "../../utils/getAvatarName";
import { NotFound } from "../NotFound";

export const DashboardPaymentsTable = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  const { data, isFetching, isLoading } = useInstructorPaymentStatsQuery(
    {
      id: userDetails?.instructor_id as number,
      page: 0,
      per_page: 10,
    },
    { skip: userDetails?.role === "LEARNER" }
  );
  const {
    data: learnerPayments,
    isFetching: fetchingLeanerPayments,
    isLoading: loadingLearnerPayments,
  } = useGetLeanerPaymentsStatsQuery(
    {
      id: userDetails?.learner_id as number,
      page: 0,
      per_page: 10,
    },
    { skip: userDetails?.role === "INSTRUCTOR" }
  );

  const { data: stats } = useGetInstructorStatsQuery(
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
  const learnerPaymentsInfo = learnerPayments?.payments.map((payment) => ({
    createdAt: payment.created_at,
    username: payment.instructor_name,
    avatar: payment.profile_picture,
    paymentId: payment.payment_id,
    paymentMethod: payment.payment_method,
    amount: payment.amount,
  }));
  const instructorPaymentsInfo = data?.payments.map((payment) => ({
    createdAt: payment.created_at,
    username: payment.learner_name,
    avatar: payment.profile_picture,
    paymentId: payment.payment_id,
    paymentMethod: payment.payment_method,
    amount: payment.amount,
  }));
  const totalEarning =
    userDetails?.role === "INSTRUCTOR"
      ? data?.total_earning
      : learnerPayments?.total_earning;

  const remainingPayment =
    userDetails?.role === "INSTRUCTOR"
      ? Number(stats?.data?.total_bookings) -
        Number(stats?.data?.total_paid_bookings)
      : Number(learnerStats?.data?.total_bookings) -
        Number(learnerStats?.data?.total_paid_bookings);
  const totalBookings =
    userDetails?.role === "INSTRUCTOR"
      ? stats?.data.total_bookings
      : learnerStats?.data.total_bookings;

  const payments =
    userDetails?.role === "INSTRUCTOR"
      ? instructorPaymentsInfo
      : learnerPaymentsInfo;

  const getPayments = (pay: typeof payments) => {
    if (pay) {
      if (pay.length > 5) {
        return pay.slice(0, 5);
      }
      return pay;
    }
  };

  return (
    <Paper withBorder>
      <Group p={10} position="apart" noWrap>
        <Text fz={18} fw={600} c={"secondary"}>
          Payments {userDetails?.role === "INSTRUCTOR" ? "Received" : "Made"}{" "}
          {remainingPayment || 0} of {totalBookings || 0}
        </Text>
      </Group>
      <Divider />
      <Box p={10}>
        {isLoading ||
        isFetching ||
        fetchingLeanerPayments ||
        loadingLearnerPayments ? (
          Array(2)
            .fill(0)
            .map((_, i) => <Skeleton h={30} my={5} key={i} />)
        ) : !payments || payments.length === 0 ? (
          <NotFound
            h={"30vh"}
            iconSize={100}
            title={`No payments ${
              userDetails?.role === "INSTRUCTOR" ? "received" : "Made"
            }`}
            caption=" "
          />
        ) : (
          getPayments(payments)?.map((payment, i) => (
            <React.Fragment key={payment.paymentId}>
              <Group noWrap position="apart">
                <Text fz={12} c={"gray.7"} fw={500}>
                  {new Date(payment.createdAt).toDateString()}
                </Text>
                <Group noWrap spacing={5}>
                  <Avatar radius={"50%"} src={payment.avatar}>
                    {getAvatarName(payment.username)}
                  </Avatar>
                  <Box>
                    <Text fw={500}>
                      {payment.username.length > 20
                        ? payment.username.substring(0, 20) + "..."
                        : payment.username}
                    </Text>
                    <Text fz={10} c={"gray.7"} fw={500}>
                      Payment ID: #{payment.paymentId}
                    </Text>
                  </Box>
                </Group>
                <Text fz={12} c={"gray.7"} fw={500} tt={"capitalize"}>
                  {payment.paymentMethod}
                </Text>
                <Text fz={12} c={"gray.7"} fw={500}>
                  ${payment.amount}
                </Text>
              </Group>
              {i !== payments.length - 1 && <Divider my={10} />}
            </React.Fragment>
          ))
        )}
      </Box>
      <Divider />
      <Text py={5} px={10} fw={500} ta={"right"}>
        {userDetails?.role === "INSTRUCTOR" ? "Total Earned" : "Total Spent"}: $
        {totalEarning ? Number(totalEarning).toFixed(2) : 0}
      </Text>
    </Paper>
  );
};
