import { AppShell, Box, Group, Text } from "@mantine/core";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "../componentsV2/BottomNav";
import { Prompt } from "../componentsV2/Prompt";
import DashboardSidebar from "../componentsV2/dashboard/DashboardSidebar";
import { useAppSelector } from "../store/hooks";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const state = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          padding: 0,
          background: "#F8F9FB",
          [theme.fn.smallerThan("md")]: {
            paddingBottom: 60,
          },
        },
      })}
      navbar={<DashboardSidebar />}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Prompt
          bg={"brand"}
          c={"#fff"}
          text={
            <Text>
              ⚡ Welcome back,{" "}
              <Text tt={"capitalize"} component="span" c={"tertiary"}>
                {user?.full_name}
              </Text>{" "}
              to the{" "}
              <Text component="span" c={"tertiary"}>
                {user?.role === "INSTRUCTOR" ? "Instructor" : "Learner"}{" "}
                Dashboard!
              </Text>{" "}
              {user?.role === "INSTRUCTOR" ? "Your hub for managing courses, engaging learners, and tracking progress. Elevate your teaching journey with us." : "Your hub for managing classes, connecting with instructor, and tracking your progress. Elevate your driving skills with us."}

            </Text>
          }
        />
        <Group
          pos={"sticky"}
          top={{ md: 39, sm: 35, base: 55 }}
          tt={"capitalize"}
          c={"dark"}
          bg={"#fff"}
          py={"md"}
          fw={600}
          pl={20}
          fz={28}
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            zIndex: 99,
          })}
        >
          {state && state.state && state.state.withBackBtn && (
            <BiArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          )}{" "}
          {state && state.state && state.state.title && state.state.title
            ? state.state.title
            : "Dashboard"}
        </Group>
        {children}
      </Box>
      <BottomNav />
    </AppShell>
  );
};

export default DashboardLayout;
