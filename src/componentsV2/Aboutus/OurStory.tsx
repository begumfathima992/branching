import { Box, Image, SimpleGrid, Stack, Text } from "@mantine/core";



export const OurStory = () => {
  return (
    <Stack pt={80} spacing={40}>
      <Box>
        <Text ta={{ sm: "center", base: "left" }} fw={700} c={"brand"}>
          Get Started
        </Text>
        <Text
          mx={"auto"}
          w={{ md: "859px", base: "100%" }}
          ta={{ sm: "center", base: "left" }}
          fz={{ sm: 38, xs: 28, base: 24 }}
          ff={"Merriweather"}
        >
          
          <Text ff={"Merriweather"} component="span" fw={700}>
            {" "}
            Drive Test Pros{" "}
          </Text>
          
          help Learners and Instuctors Unite for a Smoother Journey
        </Text>
        <Text mt={10} fz={{ sm: 16, base: 13 }} ta={'justify'}>
            At Drive Test Pros, we envision a world where driving education is
            accessible, empowering, and fosters a community of safe and
            confident drivers. We strive to revolutionize the way people learn
            to drive, making it a seamless and enriching experience for learners
            and instructors alike. Our vision is to create a global driving
            education platform that brings learners and skilled instructors
            together, fostering a culture of responsible driving and lifelong
            learning
          </Text>
      </Box>
     
    </Stack>
  );
};
