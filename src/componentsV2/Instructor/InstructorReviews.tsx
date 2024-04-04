import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Paper,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import {
  useGetInstructorReviewsQuery,
  useRateInstructorMutation,
} from "../../store/slices/instructorApiSlice";
import { IInstructorProfileById } from "../../types/IInstructor";
import { getAvatarName } from "../../utils/getAvatarName";
import { handleResponse } from "../../utils/responseHandler";
import { useAppSelector } from "../../store/hooks";
import { useGetLearnerReviewStatusQuery } from "../../store/slices/learnerApiSlice";
import { toast } from "react-toastify";

export const InstructorReviews = ({
  data,
}: {
  data: IInstructorProfileById;
}) => {
  const { userDetails } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState<number | null>(
    data.instructor.rating || 0
  );
  const [rateInstructor, { isLoading }] = useRateInstructorMutation();
  const [feedback, setFeedback] = useState<string>("");
  const { data: reviews } = useGetInstructorReviewsQuery({
    instructor_id: data.instructor.instructor_id,
  });

  const { data: learnerReviewStatus } = useGetLearnerReviewStatusQuery(
    Number(userDetails?.learner_id)
  );

  useEffect(() => {
    const params = {
      feedback: feedback as string,
      instructor_id: data.instructor.instructor_id,
      rating: rating as number,
    };
    rateInstructor(params);
  }, []);

  const getRatings = (rate: number) => {
    if (!reviews) return;
    return reviews?.reviews?.filter(
      (r) => Math.floor(r.rating) === Number(rate)
    );
  };

  const ratings = [
    {
      rating: 5,
      value: getRatings(5)?.length,
      color: "green",
    },
    {
      rating: 4,
      value: getRatings(4)?.length,
      color: "lime",
    },
    {
      rating: 3,
      value: getRatings(3)?.length,
      color: "yellow",
    },
    {
      rating: 2,
      value: getRatings(2)?.length,
      color: "orange",
    },
    {
      rating: 1,
      value: getRatings(1)?.length,
      color: "red.8",
    },
  ];
  return (
    <Paper withBorder radius={"md"} py={20}>
      <Stack px={10}>
        <Text fw={600} fz={18}>
          Rating & Reviews
        </Text>
        <Divider />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          sx={{ alignItems: "flex-start" }}
        >
          <Box>
            <Group align="flex-start" spacing={30} noWrap>
              <Box>
                <Button
                  sx={{ pointerEvents: "none" }}
                  size="xs"
                  color="green"
                  rightIcon={<FaStarHalfAlt />}
                >
                  {data.instructor.rating
                    ? data.instructor.rating.toFixed(1)
                    : 0}
                </Button>
                {/* <Text mt={10} fz={14} fw={600}>
                  700 Votes
                </Text> */}
                {/* <Text fz={12} mt={10} c={"gray.6"}>
                  {data.instructor.feedback.length}{" "}
                  {data.instructor.feedback.length === 1 ? "Review" : "Reviews"}
                </Text> */}
              </Box>
              <Stack
                spacing={2}
                pr={{ sm: 20, base: 0 }}
                sx={(theme) => ({
                  flexGrow: 1,
                  borderRight: `1px solid ${theme.colors.gray[4]}`,
                  [theme.fn.smallerThan("sm")]: { border: "none" },
                })}
              >
                {/* {ratings.map((r) => (
                  <Group noWrap key={r.rating}>
                    <ThemeIcon bg={"transparent"} c={"gray.4"}>
                      <Group noWrap align="center" spacing={5}>
                        <Text mt={3}>{r.rating}</Text> <IoMdStar />
                      </Group>
                    </ThemeIcon>
                    <Progress
                      value={r.value}
                      color={r.color}
                      h={8}
                      sx={{ flexGrow: 0.8 }}
                    />
                    <Text fw={500} fz={12}>
                      {r.value}
                    </Text>
                  </Group>
                ))} */}
              </Stack>
            </Group>
          </Box>
          <Divider display={{ sm: "none", base: "block" }} />
          <Center>
            <Box>
              <Rating
                readOnly={!learnerReviewStatus?.can_review}
                styles={(theme) => ({
                  symbolGroup: {
                    border: `1px solid ${theme.colors.gray[4]}`,
                    margin: "5px",
                  },
                })}
                defaultValue={rating as number}
                onChange={setRating}
                fractions={2}
                size="lg"
                mb={rating === 0 ? 20 : 0}
              />
              {learnerReviewStatus?.can_review && (
                <>
                  <Textarea
                    value={feedback}
                    autosize
                    mt={10}
                    onChange={(e) => setFeedback(e.target.value)}
                    minRows={1}
                    placeholder="write your review"
                  />
                  <Button
                    disabled={rating === 0 || !feedback}
                    my={10}
                    mx={"auto"}
                    display={"block"}
                    onClick={async () => {
                      if (!rating) {
                        toast.error("Please select a rating");
                        return;
                      }
                      const params = {
                        feedback: feedback as string,
                        instructor_id: data.instructor.instructor_id,
                        rating: rating as number,
                      };
                      const res = await rateInstructor(params);
                      handleResponse(res, {
                        onSuccess: () => setFeedback(""),
                      });
                    }}
                    loading={isLoading}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Box>
          </Center>
        </SimpleGrid>
      </Stack>
      <Divider />
      <Group p={10} align="flex-start" noWrap>
        <Avatar radius={"xl"} src={data.data.profile_picture}>
          {getAvatarName(data.data.full_name)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Text fw={600}>{data.data.full_name}</Text>
          <Group align="center" spacing={3}>
            <Text mt={2} c="gray.6" fz={12}>
              {data.instructor.rating ? data.instructor.rating.toFixed(1) : 0}
            </Text>
            <IoMdStar color="#F6B817" />
          </Group>
          <Text fz={14} c={"gray.7"}>
            {data.instructor.description}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};
