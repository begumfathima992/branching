import { Avatar, Box, Text } from "@mantine/core";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useInstructorPastBookingsQuery } from "../../../store/slices/instructorApiSlice";
import { useLearnerPastBookingsQuery } from "../../../store/slices/learnerApiSlice";
import { IBookings } from "../../../types/IBooking";
import { getAvatarName } from "../../../utils/getAvatarName";
import Badges from "../../Badges";
import CustomDataTable, { ICustomDatatableProps } from "../../CustomDataTable";

export const PastBooking = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const { data: instructorBookings, isLoading: loadingInstructorBookings } =
    useInstructorPastBookingsQuery(
      {
        page,
        per_page: 10,
        instructor_id: userDetails?.instructor_id as number,
      },
      { skip: userDetails?.role === "LEARNER" }
    );
  const {
    data: learnerBookings,
    isLoading: loadingLearnerBookings,
    isFetching,
    isFetching: fetchinInstructorUpcomingBookings,
  } = useLearnerPastBookingsQuery(
    {
      page,
      per_page: 10,
      learner_id: userDetails?.learner_id as number,
    },
    { skip: userDetails?.role === "INSTRUCTOR" }
  );
  const currentPage =
    userDetails?.role === "INSTRUCTOR"
      ? instructorBookings?.pagination?.current_page
      : learnerBookings?.pagination.current_page;

  const bookings =
    userDetails?.role === "INSTRUCTOR"
      ? instructorBookings?.bookings
      : learnerBookings?.bookings;

  const instructorColumns: ICustomDatatableProps<IBookings>["columns"] = [
    "booking_id",
    "profile_picture",
    "learner_name",
    "learner_address",
    "learner_phone",
    "learner_email",
    "approved",
    "has_paid",
    "date",
    "time",
  ];
  const learnerColumns: ICustomDatatableProps<IBookings>["columns"] = [
    "booking_id",
    "profile_picture",
    "instructor_name",
    "instructor_phone",
    "instructor_email",
    "instructor_price",
    "approved",
    "date",
    "time",
  ];

  const columns =
    userDetails?.role === "INSTRUCTOR" ? instructorColumns : learnerColumns;

  const instructorConfigs: ICustomDatatableProps<IBookings>["config"] = {
    learner_phone: {
      header: "mobile",
    },
  };
  const learnerConfigs: ICustomDatatableProps<IBookings>["config"] = {
    instructor_phone: {
      header: "mobile",
    },
  };
  const commonConfigs: ICustomDatatableProps<IBookings>["config"] = {
    booking_id: {
      header: "Booking No.",
      render: (value) => (
        <Text sx={{ wordBreak: "keep-all" }} c={"#646464"} fw={500} fz={14}>
          #{value.booking_id}
        </Text>
      ),
    },
    profile_picture: {
      header: "Profile",
      render: (value) => (
        <Avatar
          variant="light"
          color="blue"
          src={value.profile_picture}
          size={"md"}
          radius={"xl"}
        >
          {getAvatarName(value.learner_name)}
        </Avatar>
      ),
    },
    approved: {
      header: "Status",
      render: (value) =>
        value.approved ? (
          <Badges.Success text={"booked"} />
        ) : (
          <Badges.Danger text={"declined"} />
        ),
    },
    has_paid: {
      header: "payment",
      render: (value) =>
        value.has_paid ? (
          <Badges.Success text={"Paid"} />
        ) : (
          <Badges.Warning text={"unpaid"} />
        ),
    },
  };

  const finalConfig =
    userDetails?.role === "INSTRUCTOR"
      ? { ...instructorConfigs, ...commonConfigs }
      : { ...learnerConfigs, ...commonConfigs };
  const tableProps: ICustomDatatableProps<IBookings> = {
    columns,
    caption: "Past Bookings",
    config: {
      ...finalConfig,
      // actions: {
      //   render: () => (
      //     userDetails?.role === 'INSTRUCTOR' ? <InstructorActions /> : <LearnerActions />
      //   ),
      // },
    },
  };

  const onNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const onPreviousPage = () => {
    setPage((prev) => prev - 1);
  };
  const onChange = (v: number) => {
    setPage(v);
  };

  const totalPages =
    userDetails?.role === "INSTRUCTOR"
      ? instructorBookings?.pagination.total_pages
      : learnerBookings?.pagination.total_pages;
  const paginationProps = {
    total: totalPages as number,
    onNextPage,
    onPreviousPage,
    onChange,
    value: Number(currentPage),
  };

  return (
    <Box p={20}>
      <CustomDataTable
        emptyDataMessage="It looks like you don't have any past bookings."
        isLoading={
          loadingInstructorBookings ||
          loadingLearnerBookings ||
          fetchinInstructorUpcomingBookings ||
          isFetching
        }
        data={bookings}
        tableProps={tableProps}
        paginationProps={paginationProps}
      />
    </Box>
  );
};
