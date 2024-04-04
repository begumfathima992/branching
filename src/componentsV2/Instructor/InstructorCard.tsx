import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  List,
  Paper,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  createStyles,
  getStylesRef,
} from "@mantine/core";
import { useEffect } from "react";
import { BiSolidStarHalf } from "react-icons/bi";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import { MdOutlineReviews, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetAvailableBookingTimesMutation } from "../../store/slices/bookingApiSlice";
import { IAllInstructor } from "../../types/IInstructor";
import { formatedDate } from "../../utils/formateDate";
import { getAvatarName } from "../../utils/getAvatarName";
import Badges from "../Badges";
import { LikeIcon } from "../LikeIcon";

const useStyles = createStyles((theme) => ({
  cardWrapper: {
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

const InstructorCard = ({ data }: { data: IAllInstructor }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [availabletimeStamps, { isLoading, data: timeStamps }] =
    useGetAvailableBookingTimesMutation();

  useEffect(() => {
    availabletimeStamps({
      date: formatedDate(new Date()),
      instructor_id: data.instructor_id,
    });
  }, [data]);

  return (
    <Paper pb={10} withBorder radius={"md"} className={classes.cardWrapper}>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() =>
          navigate(`/instructor-details/${data.instructor_id}`, {
            state: { title: "Instructor Details", withBackBtn: true },
          })
        }
      >
        <Group py={10} noWrap position="apart" px={10} align="flex-start">
          <Group noWrap spacing={5} align="flex-start">
            <Avatar
              radius={"xl"}
              color="brand"
              variant="outline"
              src={data.profile_picture}
            >
              {getAvatarName(data.name)}
            </Avatar>
            <Box>
              <Text fz={14} fw={600}>
                {data.name.length > 18
                  ? data.name.substring(0, 18) + "..."
                  : data.name}
              </Text>
              <Text fz={12} c={"gray.7"}>
                ${data.price}/hr
              </Text>
            </Box>
            {data.is_verified && (
              <Tooltip label="Verified">
                <ThemeIcon c="green.6" bg="transparent">
                  <MdVerified />
                </ThemeIcon>
              </Tooltip>
            )}
          </Group>
          <LikeIcon />
        </Group>
        <Divider />
        <Stack p={10}>
          <Group spacing={5} c="secondary" fz={13} noWrap>
            <FaRegCalendar />
            <Text>Available time slots today </Text>
          </Group>
          <Group mt={-8} spacing={5} c="secondary" fz={13}>
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton h={20} key={i} w={50} radius={0} />)
              : timeStamps &&
                timeStamps?.times?.map(
                  (t, i) =>
                    !t.is_taken && <Badges.Default text={t.time} key={i} />
                )}
          </Group>
          <Stack spacing={5}>
            <Group fz={13} spacing={5} c="secondary" noWrap>
              <IoMdBriefcase />
              <Text fw={600}>
                Experience:{" "}
                <Text fw={400} fz={12} c={"gray.6"} component="span">
                  {data.year_of_exp} {data.year_of_exp > 1 ? "Years" : "Year"}{" "}
                  of Experience
                </Text>
              </Text>
            </Group>
            <Group fz={13} spacing={5} c="secondary" noWrap>
              <BsFillCarFrontFill />
              <Text fw={600}>
                Cities:{" "}
                <Tooltip
                  disabled={!data || data.cities.length === 0}
                  multiline
                  styles={(theme) => ({
                    tooltip: {
                      background: theme.colors.gray[2],
                    },
                  })}
                  label={
                    <List spacing={5} fz={12} listStyleType="square">
                      {data.cities.map((c, i) => (
                        <List.Item key={i}>{c}</List.Item>
                      ))}
                    </List>
                  }
                >
                  <Text fw={400} fz={12} c={"gray.6"} component="span">
                    {data.cities.length > 3
                      ? data.cities
                          .slice(0, 3)
                          .map((c) =>
                            c.length > 5 ? c.substring(0, 5) + "..." : c
                          )
                          .join(",") + ` ${data.cities.slice(3).length}more`
                      : data.cities
                          .map((c) =>
                            c.length > 10 ? c.substring(0, 10) + "..." : c
                          )
                          .join(",")}
                  </Text>
                </Tooltip>
              </Text>
            </Group>
            <Group fz={13} spacing={5} c="secondary" noWrap>
              <MdOutlineReviews />
              <Text fw={600}>
                Reviews:{" "}
                <Text fw={400} fz={12} c={"gray.6"} component="span">
                  <BiSolidStarHalf color="#F6B817" />{" "}
                  <Text c={"secondary"} fw={500} component="span">
                    {data.rating}
                  </Text>{" "}
                  {/* (160) */}
                </Text>
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Box>
      <Button
        className={classes.button}
        variant="outline"
        ml={"auto"}
        display={"block"}
        mr={10}
        size="xs"
        onClick={() =>
          navigate(`/instructor-details/${data.instructor_id}`, {
            state: {
              title: "Instructor Details",
              withBackBtn: true,
              opened: true,
            },
          })
        }
      >
        Book Now
      </Button>
    </Paper>
  );
};

export default InstructorCard;
