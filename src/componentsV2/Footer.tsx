import { Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BiLogoGoogle } from "react-icons/bi";
import { LiaFacebookF } from "react-icons/lia";
import { SiInstagram } from "react-icons/si";
import { RiFacebookLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BrandLogo } from "../svg/BrandLogo";
import { Copy } from '../componentsV2/Copy'

const FooterLinks = [

  { label: "About us", href: "/aboutus" },
  { label: "Contact", href: "/contactus" },
  { label: "States", href: "/features" },

];

const socialLinks = [
  {
    href: "#",
    icon: <RiFacebookLine size={".8rem"} color="#fff" />,
  },
  {
    href: "#",
    icon: <SiInstagram size={".8rem"} color="#fff"/>,
  },
  {
    href: "#",
    icon: <AiOutlineTwitter size={"1rem"} color="#fff" />,
  },
 
];

const Footer = () => {
  return (
    <SimpleGrid
      sx={{ alignItems: "flex-start" }}
      cols={2}
      bg={"white"}
      pt={40}
      px={60}
      pb={{ md: 40, base: 80 }}
      breakpoints={[{ maxWidth: "sm", cols: 1 }]}
    >
      <Stack>
        <BrandLogo  height={60} width={60} />
        <Text  fw={400}>
         Drive Test Pros was born out of a passion for<br/>moderninzing the way driving education is<br/>delivered.
        </Text>
        <Text fw={400}>Follow us:</Text>
        <Group>
          {socialLinks.map((l) => (
            <a href={l.href} rel="noreferrer" target="_blank" key={l.href}>
      <div
        style={{
          backgroundColor: "#08008C",
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {l.icon}
      </div>
            </a>
          ))}
        </Group>
        {/* <Button
          bg={"tertiary"}
          w={"fit-content"}
          sx={(theme) => ({
            ":hover": {
              background: theme.colors.yellow[6],
            },
          })}
        >
          Download Now
        </Button> */}
      </Stack>
      <Stack
     
        pt={{ sm: 0, base: 10 }}
        sx={(theme) => ({
          justifyContent: "flex-end",
          [theme.fn.smallerThan("sm")]: {
            justifyContent: "flex-end",
          },
        })}
      >
        <Text  fw={600}>
            products
          </Text>
        {FooterLinks.map((l) => (
          <Link to={l.href} key={l.href}>
            <Text
              fz={{ sm: 16, base: 14 }}
              sx={{
                ":hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: 5,
                },
              }}
              c={"black"}
            >
              {l.label}
            </Text>
          </Link>
        ))}
      </Stack>
    
    </SimpleGrid>
    
    
    
    
  );
};

export default Footer;
