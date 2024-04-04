import { Box, SimpleGrid, Stack, Text, UnstyledButton } from "@mantine/core";
import { BsClipboard2Check } from "react-icons/bs";
import { FaWifi } from "react-icons/fa";
import { LiaCalendar } from "react-icons/lia";
import { PiMapPinLineBold } from "react-icons/pi";
import { RiLineChartLine } from "react-icons/ri";

const offers = [
  {
    Icon: FaWifi,
    title: "Seamless Connectivity",
    content:
      "We understand that finding the right driving instructor or learner can be challenging. Our app simplifies this process by connecting learners with qualified instructors in their area, ensuring a perfect match for their learning needs.",
  },
  {
    Icon: RiLineChartLine,
    title: "Progress Tracking",
    content:
      "Learning to drive is a milestone journey. Our app allows learners and instructors to track progress, set goals, and celebrate achievements along the way.",
  },
  {
    Icon: LiaCalendar,
    title: "Flexible Scheduling",
    content:
      "We believe that learning should fit into your life, not the other way around. Our app enables learners to schedule driving classes at their convenience, making the process more adaptable and accessible.",
  },
  {
    Icon: BsClipboard2Check,
    title: "Online Bookings",
    content:
      "No more hassle of making phone calls or sending emails to book a class. With our app, learners can easily browse instructor profiles, check availability, and book their lessons online.",
  },
  {
    Icon: PiMapPinLineBold,
    title: "Interactive Learning Resources",
    content:
      "Learning doesn't stop in the car. We provide learners with access to interactive resources, blogs, videos, and tips that enhance their understanding of driving concepts and safety practices.",
  },
];

export const Offer = () => {
  return (
    <Box>
      <Text ff={"Merriweather"}>What We Offer</Text>
      <Text
        mt={10}
        w={{ md: "932px", base: "100%" }}
        fz={{ sm: 38, xs: 28, base: 24 }}
        ff={"Merriweather"}
      >
        What We Offer to
        <Text ff={"Merriweather"} component="span" fw={700}>
          {" "}
          Enhance Your Driving{" "}
        </Text>
        Education Experience
      </Text>
      <SimpleGrid
        breakpoints={[
          {
            maxWidth: "md",
            cols: 2,
            verticalSpacing: 25,
          },
          {
            maxWidth: "xs",
            cols: 1,
          },
        ]}
        sx={{ rowGap: 30 }}
        spacing={50}
        cols={3}
        pt={40}
      >
        {offers.map((o) => (
          <Stack spacing={10} key={o.title}>
            <UnstyledButton c={"brand"}>
              <o.Icon size={32} />
            </UnstyledButton>
            <Text
              pos={"relative"}
              sx={(theme) => ({
                "::before": {
                  content: "''",
                  height: "80%",
                  width: "2px",
                  background: theme.colors.brand[0],
                  position: "absolute",
                  top: "10%",
                  left: -10,
                },
              })}
              c={"secondary"}
              fz={24}
            >
              {o.title}
            </Text>
            <Text c={"gray.8"} ta={"justify"}>
              {o.content}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
