import { Burger, Group, ThemeIcon } from "@mantine/core";
import { useState } from "react";
import { HiHome } from "react-icons/hi2";
import { ImUserCheck } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { TbLogin } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ResponsiveDashboardSidebar } from "./ResponsiveDashboardSidebar";

export const BottomNav = () => {
  const [opened, setOpened] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

  const { pathname } = useLocation();

  return (
    <>
      <Group
        position="apart"
        display={{ md: "none", base: "flex" }}
        bg={"rgb(255 255 255 /10%)"}
        sx={(theme) => ({
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          zIndex: 99,
        })}
        px={30}
        py={10}
        pos={"fixed"}
        w={"100%"}
        bottom={0}
        left={0}
      >
        <Link to={"/"}>
          <ThemeIcon
            variant={pathname === "/" ? "filled" : "outline"}
            fz={22}
            size={"xl"}
          >
            <HiHome />
          </ThemeIcon>
        </Link>
        <ThemeIcon
          variant={pathname === "/members" ? "filled" : "outline"}
          fz={22}
          size={"xl"}
        >
          <ImUserCheck />
        </ThemeIcon>
        {token !== null && (
          <Link
            to={"/dashboard"}
            state={{ title: "Dashboard", withBackBtn: false }}
          >
            <ThemeIcon
              variant={pathname.includes("/dashboard") ? "filled" : "outline"}
              fz={22}
              size={"xl"}
            >
              <RxDashboard />
            </ThemeIcon>
          </Link>
        )}

        {token === null && (
          <Link to="/login">
            <ThemeIcon variant="outline" fz={24} size={"xl"}>
              <TbLogin />
            </ThemeIcon>
          </Link>
        )}
        {token !== null && (
          <ThemeIcon variant="outline" size={"xl"}>
            <Burger
              color="#1D348C"
              opened={opened}
              onClick={() => setOpened(true)}
            />
          </ThemeIcon>
        )}
      </Group>
      <ResponsiveDashboardSidebar opened={opened} setOpened={setOpened} />
    </>
  );
};
