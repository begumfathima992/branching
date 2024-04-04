import { Box, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";

export const AboutUs = () => {
  return (
    <Box>
      <Text fw={700} fz={18} c={"brand"}>
        About Us
      </Text>
      <Text ff={"Merriweather"} fz={{ sm: 38, xs: 28, base: 24 }}>
        Introducing
        <Text ff={"Merriweather"} component="span" fw={700}>
          {" "}
          Drive Test Pros{" "}
        </Text>
      </Text>
      <Text ff={"Merriweather"} fz={{ sm: 38, xs: 28, base: 24 }}>
        {" "}
        to Transform Driving Education
      </Text>

      <SimpleGrid
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
        cols={2}
        pt={60}
        c="secondary"
      >
        <Paper
          radius={10}
          p={{ sm: 42, base: 25 }}
          style={{
            background: "linear-gradient(#FFE0B1, #FBF1D4)",
          }}
        >
          <Text fz={{ sm: 38, xs: 28, base: 24 }}>Vision</Text>
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
        </Paper>
        <Paper
          p={{ sm: 42, base: 25 }}
          style={{
            background: "linear-gradient(#FBEEFF, #E1DFFF)",
          }}
          radius={10}
        >
          <Text fz={{ sm: 38, xs: 28, base: 24 }}>Mission</Text>
          <Text mt={10} fz={{ sm: 16, base: 13 }} ta={'justify'}>
            At Drive Test Pros, our mission is to pair students with qualified
            driving instructors, fostering a vibrant and encouraging environment
            for learning the art of driving. In order to streamline the way
            driving instruction is provided, we are committed to maintain a
            secure and user-centric platform.
          </Text>
        </Paper>
      </SimpleGrid>
    </Box>
  );
};
