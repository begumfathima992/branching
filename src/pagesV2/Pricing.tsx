import {
  Box,
  Button,
  Center,
  Container,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { JoinUs } from "../componentsV2/JoinUs";
import { Faq } from "../componentsV2/Pricings/Faq";
import { Prices } from "../componentsV2/Pricings/Prices";

export const Pricing = () => {
  return (
    <>
      <Container
        sizes={{ md: 1200, lg: 1200, xl: 1200, sm: "auto", xs: "auto" }}
      >
        <Center mih={{ md: "50vh", base: "70vh" }}>
          <Box>
            <Text
              sx={(theme) => ({
                fontFamily: theme.other.fonts.secondary,
              })}
              ta={"center"}
              fz={{ sm: 18, base: 14 }}
              c={"brand"}
            >
              Choose your plans
            </Text>
            <Title
              sx={(theme) => ({
                fontFamily: theme.other.fonts.secondary,
              })}
              ta={"center"}
              fz={{ sm: 48, base: 32 }}
            >
              Pricing/Membership Plans
            </Title>
            <Text
              mt={10}
              w={{ md: "900px", base: "auto" }}
              ta={"center"}
              fz={{ sm: 18, base: 14 }}
            >
              Discover the perfect plan to meet your driving education needs.
              Whether you're a learner looking to master the road or an
              instructor ready to share your expertise, we have a plan that fits
              you.
            </Text>
          </Box>
        </Center>
        <Prices />
        <Stack align="center" pt={60}>
          <Text fz={18} ta={"center"}>
            Contact us for a customized price details specific to your
            requirements
          </Text>
          <Button>CONTACT</Button>
        </Stack>
        <Faq />
      </Container>
      <JoinUs />
    </>
  );
};
