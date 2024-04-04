import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Rating,
  Skeleton,
  Text,
} from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { useGetInstructorReviewsQuery } from "../../store/slices/instructorApiSlice";
import { useGetLearnerReviewStatusQuery } from "../../store/slices/learnerApiSlice";
import { IInstructorReviews } from "../../types/IInstructor";
import { ILearnerReviewStatus } from "../../types/ILearner";
import { getAvatarName } from "../../utils/getAvatarName";
import { NotFound } from "../NotFound";

export const DashboardReviewsTable = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  const { data: learnerRemainingReviews, isLoading: learnerReviewsLoading } =
    useGetLearnerReviewStatusQuery(Number(userDetails?.learner_id), {
      skip: userDetails?.role === "INSTRUCTOR",
    });
  const { data, isLoading } = useGetInstructorReviewsQuery(
    {
      instructor_id: userDetails?.instructor_id as number,
    },
    {
      skip: userDetails?.role === "LEARNER",
    }
  );

  if (isLoading || learnerReviewsLoading) return <Skeleton h={300} />;
  return (
    <Paper
      withBorder
      sx={(theme) => ({
        [theme.fn.smallerThan("md")]: {
          order: 1,
        },
      })}
    >
      <Text p={10} fz={18} fw={600} c={"secondary"}>
        {userDetails?.role === "INSTRUCTOR"
          ? "Reviews Received"
          : "Pending Reviews"}
      </Text>
      <Divider />
      <Box p={10}>
        {userDetails?.role === "INSTRUCTOR" ? (
          <InstructorReviewsTable data={data} />
        ) : (
          <LeanerReviewsTable data={learnerRemainingReviews} />
        )}
      </Box>
    </Paper>
  );
};

const InstructorReviewsTable = ({
  data,
}: {
  data: IInstructorReviews | undefined;
}) => {
  console.log(data);

  const { userDetails } = useAppSelector((state) => state.auth);
  const getReviews = (reviews: IInstructorReviews) => {
    if (reviews.reviews.length > 5) {
      return reviews.reviews.slice(0, 5);
    }
    return reviews.reviews;
  };
  if (!data || data?.reviews.length === 0)
    return <NotFound h={"30vh"} iconSize={100} title="No Reviews Received" />;
  return (
    <>
      {getReviews(data)?.map((review, index) => (
        <Grid key={review.review_id + index} align="center">
          <Grid.Col span={4}>
            <Group noWrap>
              <Avatar radius={"50%"} src={review?.profile_picture}>
                {getAvatarName(review?.learner_name)}
              </Avatar>
              <Box>
                <Text fz={14} c={"secondary"} fw={500}>
                  {review.learner_name}
                </Text>
                <Text fz={12} c={"gray.7"} fw={500} tt={"uppercase"}>
                  {userDetails?.role === "INSTRUCTOR"
                    ? "student"
                    : "Instructor"}
                </Text>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col span={5}>
            {userDetails?.role === "INSTRUCTOR" && (
              <>
                {review?.feedback ? (
                  review.feedback
                ) : (
                  <Text fz={12} c={"red.9"}></Text>
                )}
              </>
            )}
          </Grid.Col>
          <Grid.Col span={3}>
            <Rating value={review.rating} readOnly />
          </Grid.Col>
        </Grid>
      ))}
    </>
  );
};
const LeanerReviewsTable = ({
  data,
}: {
  data: ILearnerReviewStatus | undefined;
}) => {
  if (!data || Object.keys(data.data).length === 0)
    return (
      <NotFound
        h={"30vh"}
        iconSize={100}
        title="No Pending Reviews"
        caption=" "
      />
    );
  return (
    <Group position="apart" spacing={20}>
      <Group noWrap>
        <Avatar radius={"50%"} src={data.data.profile_picture}>
          {getAvatarName(data?.data.instructor_name)}
        </Avatar>
        <Box>
          <Text fz={14} c={"secondary"} fw={500}>
            {data.data.instructor_name}
          </Text>
          <Text fz={12} c={"gray.7"} fw={500} tt={"uppercase"}>
            {data.data.instructor_email}
          </Text>
        </Box>
      </Group>
      <Button fw={500} compact>
        REVIEW
      </Button>
    </Group>
  );
};
