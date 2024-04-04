import { Divider, Grid, Paper, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import LoaderUi from "../../../componentsV2/LoaderUi";
import { NotFound } from "../../../componentsV2/NotFound";
import { ResetPasswordForm } from "../../../componentsV2/auth/ResetPasswordForm";
import { ProfileSidebar } from "../../../componentsV2/dashboard/Profile/ProfileSidebar";
import { useAppSelector } from "../../../store/hooks";
import { useInstructorProfileQuery } from "../../../store/slices/instructorApiSlice";
import { useLearnerProfileQuery } from "../../../store/slices/learnerApiSlice";
import { InstructorPreferenceEdit } from "../Instructor/InstructorPrerenceEdit";
import { LearnerPreferencesEdit } from "../Learner/LearnerPreferencesEdit";
import { ProfileEdit } from "./ProfileEdit";

type IParams = {
  edit: "edit" | "reset-password" | "preference";
};

export const Edit = () => {
  const { edit } = useParams() as IParams;
  const { data: instructor, isLoading: instructorLoading } =
    useInstructorProfileQuery();
  const { data: learner, isLoading: learnerLoading } = useLearnerProfileQuery();
  const { token, userDetails } = useAppSelector((state) => state.auth);

  if (instructorLoading || learnerLoading) return <LoaderUi />;
  if (!instructor || !learner) return <NotFound h={"55vh"} />;

  return (
    <ProfileEditLayout
      data={{
        isVerified: instructor.instructor.is_verified,
        name: learner.data.full_name || instructor.data.full_name,
        profile:
          learner.data.profile_picture || instructor.data.profile_picture,
        email: learner.data.username,
        price: instructor.instructor.price,
      }}
      param={edit}
    >
      {edit === "edit" ? (
        <ProfileEdit data={instructor} />
      ) : edit === "preference" ? (
        userDetails?.role === "INSTRUCTOR" ? (
          <InstructorPreferenceEdit data={instructor} />
        ) : (
          userDetails?.role === "LEARNER" && (
            <LearnerPreferencesEdit data={learner} />
          )
        )
      ) : (
        edit === "reset-password" &&
        token && (
          <ResetPasswordForm token={token} withTitle={false} p={10} pt={20} />
        )
      )}
    </ProfileEditLayout>
  );
};

type ProfileHeaderProps = {
  profile: string | null;
  name: string | null;
  isVerified?: boolean;
  price?: number | null;
  email?: string | null;
};

const ProfileEditLayout = ({
  children,
  data,
  param,
}: {
  children: React.ReactNode;
  data: ProfileHeaderProps;
  param: IParams["edit"];
}) => {
  return (
    <Grid align="stretch" p={20}>
      <Grid.Col md={4} span={12}>
        <ProfileSidebar {...data} />
      </Grid.Col>
      <Grid.Col md={8} span={12}>
        <Paper withBorder radius={5}>
          <Text p={10} fw={500} c={"secondary"}>
            {param === "reset-password"
              ? "Update Password"
              : param === "preference"
              ? "Preference"
              : "Profile Information"}
          </Text>
          <Divider />
          {children}
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
