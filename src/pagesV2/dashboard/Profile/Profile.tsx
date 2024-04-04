import { Grid, Paper, Stack } from "@mantine/core";
import { InstructorPreferences } from "../../../componentsV2/dashboard/Instructor/InstructorPreferences";
import { LearnerPreferences } from "../../../componentsV2/dashboard/Learner/LearnerPreferences";
import { AuthDetails } from "../../../componentsV2/dashboard/Profile/AuthDetails";
import { ProfileDetails } from "../../../componentsV2/dashboard/Profile/ProfileDetails";
import { ProfileHeader } from "../../../componentsV2/dashboard/Profile/ProfileHeader";
import ProfileLodingSkeleton from "../../../componentsV2/skeletons/ProfileLodingSkeleton";
import { useAppSelector } from "../../../store/hooks";
import { useInstructorProfileQuery } from "../../../store/slices/instructorApiSlice";
import { useLearnerProfileQuery } from "../../../store/slices/learnerApiSlice";
import { Text } from "@mantine/core";
import { DeleteAccountModal } from "../../../Modals/DeleteAccountModal";

export const Profile = () => {
  const { userDetails } = useAppSelector((state) => state.auth);

  const { data: instructor, isLoading: loadingInstructor } =
    useInstructorProfileQuery();
  const { data: learner, isLoading: loadingLearner } = useLearnerProfileQuery();

  const instructorDetails = [
    { label: "Date of Birth", content: instructor?.data.dob },
    { label: "Email", content: instructor?.data.username },
    { label: "Contact", content: instructor?.data.contact },
    { label: "Country", content: instructor?.data.country },
    { label: "State", content: instructor?.data.province },
    { label: "City", content: instructor?.data.city },
    { label: "Address", content: instructor?.data.address },
  ];
  const learnerrDetails = [
    { label: "Date of Birth", content: learner?.data.dob },
    { label: "Email", content: learner?.data.username },
    { label: "Contact", content: learner?.data.contact },
    { label: "Country", content: learner?.data.country },
    { label: "State", content: learner?.data.province },
    { label: "City", content: learner?.data.city },
    { label: "Address", content: learner?.data.address },
  ];

  const details =
    userDetails?.role === "INSTRUCTOR" ? instructorDetails : learnerrDetails;

  return (
    <Stack p={20}>
      {loadingInstructor || loadingLearner || !instructor || !learner ? (
        <ProfileLodingSkeleton />
      ) : (
        <Stack>
          <ProfileHeader
            isVerified={userDetails?.is_verified}
            name={learner.data.full_name || instructor.data.full_name}
            profile={
              learner.data.profile_picture || instructor.data.profile_picture
            }
            email={learner.data.username}
            price={instructor.instructor.price}
          />
          <Grid align="stretch">
            <Grid.Col md={7} span={12}>
              <ProfileDetails data={details} />
            </Grid.Col>
            <Grid.Col md={5} span={12}>
              {userDetails?.role === "INSTRUCTOR" ? (
                <InstructorPreferences data={instructor} />
              ) : (
                <LearnerPreferences data={learner} />
              )}
            </Grid.Col>
          </Grid>
        </Stack>
      )}
      <Grid>
        <Grid.Col md={7} span={12}>
          <AuthDetails />
        </Grid.Col>
        <Grid.Col md={5} span={12}>
          <Paper
            withBorder
            radius={5}
            p={10}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text c={"secondary"} fw={500} fz={18}>
              Delete my account
            </Text>
            <DeleteAccountModal />
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
