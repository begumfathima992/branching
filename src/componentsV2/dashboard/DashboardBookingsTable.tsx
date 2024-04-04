import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  useGetAllInstructorsQuery,
  useInstructorUpcomingBookingsQuery,
} from "../../store/slices/instructorApiSlice";
import { useLearnerUpcomingBookingsQuery } from "../../store/slices/learnerApiSlice";
import { getAvatarName } from "../../utils/getAvatarName";
import { NotFound } from "../NotFound";
import { CurrentInstructor } from "./Learner/CurrentInstructor";

export const DashboardBookingsTable = () => {
  const navigate = useNavigate();
  const { userDetails } = useAppSelector((state) => state.auth);
  const { data: instructorBookings, isLoading: loadingInstructorBookings } =
    useInstructorUpcomingBookingsQuery(
      {
        page: 0,
        per_page: 5,
        instructor_id: userDetails?.instructor_id as number,
      },
      { skip: userDetails?.role === "LEARNER" }
    );
  const { data: learnerBooking, isLoading: loadingLearnerBooking } =
    useLearnerUpcomingBookingsQuery(
      {
        page: 0,
        learner_id: userDetails?.learner_id as number,
        per_page: 5,
      },
      { skip: userDetails?.role === "INSTRUCTOR" }
    );

  const { data: instructors } = useGetAllInstructorsQuery();
  const currentInstructor =
    !learnerBooking || learnerBooking?.bookings.length !== 0
      ? instructors?.instructors?.find(
          (ins) =>
            ins?.instructor_id === learnerBooking?.bookings?.[0]?.instruction_id
        )
      : null;
  const bookings =
    userDetails?.role === "INSTRUCTOR"
      ? instructorBookings?.bookings
      : learnerBooking?.bookings;

  if (loadingInstructorBookings || loadingLearnerBooking)
    return <Skeleton height={300} />;

  return (
    <Stack>
      {userDetails?.role === "LEARNER" && (
        <CurrentInstructor currentInstructor={currentInstructor} />
      )}
      <Paper withBorder>
        <Group p={10} position="apart" noWrap>
          <Text fz={18} fw={600} c={"secondary"}>
            Upcoming Bookings
          </Text>
          <Link to={"/dashboard/bookings/upcoming"}>
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
            >
              View All
            </Button>
          </Link>
        </Group>
        <Divider />
        {!bookings || bookings?.length === 0 ? (
          <NotFound
            h={"30vh"}
            iconSize={100}
            title="Looks like you don't have any upcoming bookings"
            caption=" "
          />
        ) : (
          bookings.map((b, i) => (
            <Box px={10} key={b.booking_id + i}>
              <Group noWrap position="apart">
                <Text
                  fz={12}
                  c={"gray.7"}
                  fw={500}
                  sx={{ wordBreak: "keep-all" }}
                >
                  {new Date(b.date).toDateString()}
                </Text>
                <Group noWrap spacing={5}>
                  <Avatar radius={"50%"} src={b.profile_picture}>
                    {getAvatarName(
                      userDetails?.role === "LEARNER"
                        ? b.learner_name
                        : b.instructor_name
                    )}
                  </Avatar>
                  <Box>
                    <Text fw={500}>
                      {userDetails?.role === "INSTRUCTOR"
                        ? b.learner_name.length > 20
                          ? b.learner_name.substring(0, 20) + "..."
                          : b.learner_name
                        : b.instructor_name.length > 20
                        ? b.instructor_name.substring(0, 20) + "..."
                        : b.instructor_name}
                    </Text>
                    <Text>{}</Text>
                  </Box>
                </Group>
                <Text fz={12} c={"gray.7"} fw={500}>
                  {b.time}
                </Text>
                <Box mt={5} sx={{ boxShadow: "-1px 1px 8px #D9E5F2" }} p={10}>
                  {/* <InstructorActions data={b} /> */}
                  <Button
                    compact
                    fw={600}
                    onClick={() =>
                      navigate(`/instructor-details/${b.instruction_id}`, {
                        state: {
                          title: "Instructor Details",
                          withBackBtn: true,
                        },
                      })
                    }
                  >
                    VIEW DETAILS
                  </Button>
                </Box>
              </Group>
              {i !== bookings.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Paper>
    </Stack>
  );
};
