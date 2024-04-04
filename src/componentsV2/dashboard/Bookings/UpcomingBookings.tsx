import { Avatar, Box, Text } from "@mantine/core";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useInstructorUpcomingBookingsQuery } from "../../../store/slices/instructorApiSlice";
import { useLearnerUpcomingBookingsQuery } from "../../../store/slices/learnerApiSlice";
import { getAvatarName } from "../../../utils/getAvatarName";
import Badges from "../../Badges";
import CustomDataTable, { ICustomDatatableProps } from "../../CustomDataTable";
import InstructorActions from "./InstructorActions";
import LearnerActions from "./LearnerActions";
import { IBookings } from "../../../types/IBooking";

export const UpcomingBookings = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const {
    data: instructorBookings,
    isLoading: loadingInstructorBookings,
    isFetching: fetchinInstructorUpcomingBookings,
  } = useInstructorUpcomingBookingsQuery(
    {
      page,
      per_page: 10,
      instructor_id: userDetails?.instructor_id as number,
    },
    { skip: userDetails?.role === "LEARNER" }
  );
  const {
    data: learnerUpcomingBookings,
    isLoading: loadingLearnerBookings,
    isFetching,
  } = useLearnerUpcomingBookingsQuery(
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
      : learnerUpcomingBookings?.pagination.current_page;

  const bookings =
    userDetails?.role === "INSTRUCTOR"
      ? instructorBookings?.bookings
      : learnerUpcomingBookings?.bookings;

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
    "actions",
  ];
  const learnerColumns: ICustomDatatableProps<IBookings>["columns"] = [
    "booking_id",
    "profile_picture",
    "instructor_name",
    "instructor_phone",
    "instructor_email",
    "instructor_price",
    "approved",
    "has_paid",
    "date",
    "time",
    "actions",
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
    instructor_price: {
      render: (value) => (
        <Text sx={{ wordBreak: "keep-all" }} c={"#646464"} fw={500} fz={14}>
          {value.instructor_price}
        </Text>
      ),
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
          <Badges.Danger text={"Pending"} />
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
    columns: columns,
    caption: "Upcoming Bookings",
    config: {
      ...finalConfig,
      actions: {
        render: (value) =>
          userDetails?.role === "INSTRUCTOR" ? (
            <InstructorActions data={value} />
          ) : (
            <LearnerActions data={value} />
          ),
      },
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
      : learnerUpcomingBookings?.pagination.total_pages;
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
        isLoading={
          loadingInstructorBookings ||
          loadingLearnerBookings ||
          isFetching ||
          fetchinInstructorUpcomingBookings
        }
        data={bookings}
        tableProps={tableProps}
        paginationProps={paginationProps}
      />
    </Box>
  );
};
