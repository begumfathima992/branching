import { SimpleGrid, Stack, Box, Image, Text } from "@mantine/core";
const data = [
  {
    title: "User-Centric Approach",
    content:
      "Our app is designed with you in mind. We prioritize user feedback and continuously improve the app to meet your evolving needs.",
  },
  {
    title: "Qualified Instructors",
    content:
      "We partner with experienced and certified driving instructors who are dedicated to helping learners become confident and responsible drivers.",
  },
  {
    title: "Innovation",
    content:
      "We're not just an app; we're a driving education experience that harnesses the power of technology to revolutionize the way we learn to drive.",
  },
  {
    title: "Safe and Secure",
    content:
      "Your safety is paramount to us. We employ advanced security measures  to protect your personal information and ensure a secure learning environment.",
  },
];

export const ChooseUs = () => {
  return (
    <SimpleGrid
      breakpoints={[{ maxWidth: "md", cols: 1 }]}
      spacing={40}
      sx={{ alignItems: "center" }}
      py={80}
      cols={2}
    >
      <Image
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 1,
          },
        })}
        src={"images/getstarted2.png"}
        alt="choose us"
      />
      <Stack
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 0,
          },
        })}
      >
        <Box>
          <Text ff={"Merriweather"} c={"brand"} fw={700}>
            Why Choose Us
          </Text>
          <Text ff={"Merriweather"} fz={{ sm: 34, xs: 24, base: 18  }}>
            Why Choose Us for Your Driving Education?{" "}
          </Text>
        </Box>
        {data.map((d) => (
          <Box key={d.title}>
            <Text fz={{ sm: 26, xs: 20, base: 18 }}>{d.title}</Text>
            <Text mt={5} c={"secondary"} fz={{ sm: 16, base: 13 }}>
              {d.content}
            </Text>
          </Box>
        ))}
      </Stack>
    </SimpleGrid>
  );
};
