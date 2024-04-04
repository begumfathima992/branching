import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  Flex,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
  FcAbout,
  FcCallback,
  FcConferenceCall,
  FcSettings,
  FcTemplate,
  FcViewDetails,
  FcWorkflow,
} from "react-icons/fc";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setToken, setUser, setUserDetails } from "../store/slices/authSlice";
import { BrandLogo } from "../svg/BrandLogo";
import { getAvatarName } from "../utils/getAvatarName";

const useStyles = createStyles((theme) => ({
  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${theme.colors.gray[4]}`,
  },
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${theme.colors.gray[4]}`,
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function ResponsiveDashboardSidebar({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (o: boolean) => void;
}) {
  const { userDetails, token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const instructorLinks = {
    label: "Track Learners",
    href: "/instructor/track-students",
    icon: FcWorkflow,
    state: { title: "Track Learners", withBackBtn: false },
  };
  const learnerLinks = {
    label: "Instructors",
    href: "/dashboard/instructors",
    state: { title: "Instructors", withBackBtn: false },
    icon: FcConferenceCall,
  };
  const mainLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: FcTemplate,
      state: { title: "Dashboard", withBackBtn: false },
    },
    {
      label: "Booking",
      icon: FcCallback,
      href: "/dashboard/bookings/upcoming",
      state: { title: "Bookings", withBackBtn: false },
    },
    userDetails?.role === "INSTRUCTOR" ? instructorLinks : learnerLinks,
    {
      label: "Settings",
      icon: FcSettings,
      initiallyOpened: true,
      links: [
        {
          label: "Profile",
          link: "/dashboard/profile",
          state: { title: "Profile", withBackBtn: false },
        },
        {
          label: "Contact",
          link: "/contact",
          state: { title: "Contact", withBackBtn: false },
        },
        {
          label: "Support",
          link: "/support",
          state: { title: "Support", withBackBtn: false },
        },
      ],
    },
    { label: "About", icon: FcAbout, href: "/about" },
    { label: "Courses", icon: FcViewDetails, href: "/courses" },
  ];

  const { classes } = useStyles();
  const links = mainLinks.map((item, index) => (
    <LinksGroup tglDrawer={setOpened} {...item} key={item?.href! + index} />
  ));

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userDetails");
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setUserDetails(null));
    navigate("/login");
  };

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Group position="apart">
          <BrandLogo width={50} height={50} />
        </Group>
      }
      styles={(theme) => ({
        header: {
          borderBottom: `1px solid ${theme.colors.gray[4]}`,
        },
      })}
    >
      <Stack h={"87svh"} justify="space-between">
        <Box className={classes.linksInner}>{links}</Box>
        {token && (
          <Flex align={"center"} px={15} className={classes.footer} h={80}>
            <Group w="100%" onClick={logout} position="apart">
              <Group>
                <Avatar size={"lg"} src={user?.profile_picture} radius={"50%"}>
                  {getAvatarName(user?.full_name)}
                </Avatar>
                <Box>
                  <Text fw={600} c="brand" tt={"capitalize"}>
                    {user?.full_name}
                  </Text>
                  <Text fz={14} c={"gray.7"}>
                    {user?.username}
                  </Text>
                </Box>
              </Group>
              <ThemeIcon fz={28} c="gray.4" bg="transparent" size={"xl"}>
                <MdOutlineLogout />
              </ThemeIcon>
            </Group>
          </Flex>
        )}
      </Stack>
    </Drawer>
  );
}

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string; state?: Record<string, unknown> }[];
  tglDrawer: (o: boolean) => void;
  href?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  tglDrawer,
  href,
  links,
}: LinksGroupProps) {
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const items = (hasLinks ? links : []).map((link, index) => (
    <Link
      to={link.link}
      state={link.state}
      key={link.link + index}
      onClick={() => tglDrawer(false)}
    >
      <Text
        className={classes.link}
        bg={pathname === link.link ? "gray.0" : "transparent"}
      >
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box
            onClick={() => {
              href && navigate(href);
              tglDrawer(false);
            }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Icon size="1.1rem" />
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <BiChevronDown
              className={classes.chevron}
              size="1rem"
              style={{
                transform: opened ? `rotate(-90deg)` : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
