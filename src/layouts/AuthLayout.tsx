import { Box, Grid } from "@mantine/core";
import AuthSidebar from "../componentsV2/auth/AuthSidebar";
import { BottomNav } from "../componentsV2/BottomNav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box>
        <Grid
          align={"stretch"}
          justify={"space-between"}
          mih={"100svh"}
          pos={"relative"}
          bg="#F3F5F9"
        >
          <Grid.Col
            display={{ md: "block", base: "none" }}
            bg={"#fff"}
            span={6}
            pb={80}
            px={40}
          >
            <AuthSidebar />
          </Grid.Col>
          <Grid.Col md={6} span={12} pb={80} pt={30} px={40} pos={"relative"}>
            {children}
          </Grid.Col>
        </Grid>
      </Box>
      <BottomNav />
    </>
  );
};

export default AuthLayout;
