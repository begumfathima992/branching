import { Button, Group, Header, Text } from "@mantine/core";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setToken, setUser, setUserDetails } from "../store/slices/authSlice";
import { BrandLogo } from "../svg/BrandLogo";
import { Prompt } from "./Prompt";
import { Copy } from '../componentsV2/Copy'

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/aboutus",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Contact",
    href: "/contactus",
  },
];

function Appheader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const { pathname } = useLocation();

  return (
    <>
      <Prompt />
      <Header
        height={70}
        pos={"sticky"}
        px={30}
        py={10}
        top={{ sm: 39, base: 35 }}
        zIndex={2}
        sx={(theme) => ({
          border: "none",
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Group noWrap align={"center"} spacing={30}>
          <Link to="/">
            <BrandLogo height={65} width={65} />
          </Link>
          <Group display={{ md: "flex", base: "none" }}>
            {links.map((l, index) => (
              <Link to={l.href} key={l.href + index}>
                <Text
                  c={pathname === l.href ? "brand" : "secondary"}
                  fw={pathname === l.href ? 600 : 400}
                  {...(pathname === l.href && {
                    sx: () => ({
                      textUnderlineOffset: 5,
                      textDecoration: "underline",
                    }),
                  })}
                >
                  {l.label}
                </Text>
              </Link>
            ))}
            {token !== null && (
              <Link
                to={"/dashboard"}
                state={{ title: "Dashboard", withBackBtn: false }}
              >
                <Text c="#000"> Dashboard</Text>
              </Link>
            )}
          </Group>
        </Group>
        <Group>
          {token === null && (
            <Link to="/login">
              <Button
                fw={180}
                fz={15}
                h={35}
                ff={"Merriweather"}
                bg={"white"}
                sx={(theme) => ({
                  ":hover": {
                    background: theme.colors.brand[6],
                    color:theme.white,
                    // outline: `2px dashed ${theme.colors.brand[0]}`,
                  },
                })}
                c="brand"
              >
                LOG IN
              </Button>
            </Link>
          )}

          {token === null && (
            <Link to="/register">
              <Button fw={180} fz={20} h={45} ff={"Merriweather"}
                sx={(theme) => ({
                  ":hover": {
                    background: theme.white,
                    color:theme.colors.brand[6],
                    // outline: `2px dashed ${theme.colors.brand[0]}`,
                  },
                })}>
                SIGN UP
              </Button>
            </Link>
          )}

          {token !== null && (
            <Button
              fw={600}
              fz={20}
              h={45}
              ff={"Merriweather"}
              bg={"gray.0"}
              sx={(theme) => ({
                ":hover": {
                  background: theme.colors.gray[2],
                  outline: `2px dashed ${theme.colors.brand[0]}`,
                },
              })}
              c="brand"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("userDetails");
                dispatch(setToken(null));
                dispatch(setUser(null));
                dispatch(setUserDetails(null));
                navigate("/login");
              }}
            >
              logout
            </Button>
          )}
        </Group>
      </Header>
    </>
  );
}

export default Appheader;
