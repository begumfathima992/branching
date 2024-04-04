import {
  Avatar,
  Box,
  Divider,
  Group,
  Navbar,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import {
  MdOutlineConnectWithoutContact,
  MdOutlineContactSupport,
  MdOutlineLogout,
} from "react-icons/md";
import { PiPathBold } from "react-icons/pi";
import { RiUser3Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setToken,
  setUser,
  setUserDetails,
} from "../../store/slices/authSlice";
import { BrandLogo } from "../../svg/BrandLogo";
import { getAvatarName } from "../../utils/getAvatarName";

const instructorLinks = [
  {
    label: "Track Learners",
    href: "/instructor/track-students",
    state: { title: "Track Learners", withBackBtn: false },
    icon: <PiPathBold />,
  },
];

const learnerLinks = [
  {
    label: "Instructors",
    href: "/dashboard/instructors",
    state: { title: "Instructors", withBackBtn: false },
    icon: <BsCarFrontFill />,
  },
];
const mainLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    state: { title: "Dashboard", withBackBtn: false },
    icon: <GoHome />,
  },
  {
    label: "Bookings",
    href: "/dashboard/bookings/upcoming",
    state: { title: "Booking", withBackBtn: false },
    icon: <FaRegCalendar />,
  },
];

const DashboardSidebar = () => {
  const [opened, setOpened] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, userDetails } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const links = {
    main:
      userDetails?.role === "INSTRUCTOR"
        ? [...mainLinks, ...instructorLinks]
        : [...mainLinks, ...learnerLinks],
    settings: [
      {
        label: "Profile",
        href: "/dashboard/profile",
        state: { title: "Profile", withBackBtn: false },
        icon: <RiUser3Fill />,
      },
      {
        label: "Contact",
        href: "/contact",
        state: { title: "Contact", withBackBtn: false },
        icon: <MdOutlineConnectWithoutContact />,
      },
      {
        label: "Support",
        href: "/support",
        state: { title: "Support", withBackBtn: false },
        icon: <MdOutlineContactSupport />,
      },
    ],
  };

  return (
    <Navbar
      pos={"sticky"}
      top={0}
      width={{ sm: 200 }}
      styles={{
        main: { padding: 0 },
        body: {
          padding: 0,
        },
        root: {
          padding: 0,
        },
      }}
      height="100vh"
      px={15}
      py={30}
      bg={"#fff"}
      display={{ md: "flex", base: "none" }}
    >
      <Navbar.Section grow>
        <Stack>
          <Link style={{ margin: "auto", display: "block" }} to="/">
            <BrandLogo height={55} width={55} />
          </Link>
          <Stack spacing={2} pt={10}>
            {links.main.map((link) => (
              <Link key={link.href} to={link.href} state={link.state}>
                <Group
                  fz={14}
                  c={pathname === link.href ? "#fff" : "gray.7"}
                  bg={pathname === link.href ? "brand" : "transparent"}
                  spacing={8}
                  align="center"
                  py={8}
                  px={5}
                  sx={(theme) => ({
                    borderRadius: 5,
                    ":hover": {
                      background: theme.colors.gray[2],
                      color: theme.colors.dark,
                    },
                  })}
                >
                  {link.icon}
                  <Text mt={1}>{link.label}</Text>
                </Group>
              </Link>
            ))}
          </Stack>
          <Divider />
          <Stack spacing={10}>
            <Group
              position="apart"
              sx={{ cursor: "pointer" }}
              onClick={() => setOpened(!opened)}
              pb={opened ? 10 : 0}
            >
              <Text fz={14} fw={600}>
                Setting
              </Text>{" "}
              <BiChevronDown />
            </Group>
            {opened &&
              links.settings.map((link) => (
                <Link key={link.href} to={link.href} state={link.state}>
                  <Group
                    fz={14}
                    c={pathname === link.href ? "brand" : "gray.7"}
                    fw={pathname === link.href ? 600 : 400}
                    spacing={8}
                  >
                    {link.icon}
                    <Text>{link.label}</Text>
                  </Group>
                </Link>
              ))}
          </Stack>
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack>
          <UnstyledButton
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("userDetails");
              dispatch(setToken(null));
              dispatch(setUser(null));
              dispatch(setUserDetails(null));
              navigate("/login");
            }}
          >
            {!user ? (
              <Group spacing={5} noWrap>
                <Skeleton h={40} w={40} radius={"50%"} />
                <Stack sx={{ flexGrow: 1 }} spacing={3}>
                  <Skeleton h={3} w={"100%"} />
                  <Skeleton h={3} w={"100%"} />
                </Stack>
              </Group>
            ) : (
              <Group noWrap position="apart">
                <Group spacing={5} align="flex-start" noWrap>
                  <Avatar
                    color="blue"
                    radius={"xl"}
                    src={user?.profile_picture}
                    size={"md"}
                  >
                    {getAvatarName(user?.full_name)}
                  </Avatar>
                  <Box>
                    <Text tt="capitalize" c={"brand"} fw={500} fz={14}>
                      {user?.full_name && user?.full_name}
                    </Text>
                    <Text tt="capitalize" fw={300} fz={12} c="gray.6">
                      {user?.role.toLowerCase()}
                    </Text>
                  </Box>
                </Group>
                <MdOutlineLogout color="#1D348C" size={24} />
              </Group>
            )}
          </UnstyledButton>
          <Divider />
          <UnstyledButton ta={"center"}>Send feedback</UnstyledButton>
          <Divider />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default DashboardSidebar;
