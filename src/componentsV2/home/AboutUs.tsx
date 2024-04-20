import { Box, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";

export const AboutUs = () => {
  return (
    <Box>
      <Text fw={700} fz={18} c={"brand"}>
        About Us
      </Text>
      <Text ff={"Merriweather"} fz={{ sm: 34, xs: 24, base: 18 }}>
        Introducing
        <Text ff={"Merriweather"} component="span" fw={700}>
          {" "}
          Drive Test Pros{" "}
        </Text>
      </Text>
      <Text ff={"Merriweather"} fz={{ sm: 34, xs: 24, base: 18  }}>
        {" "}
        to Transform Driving Education
      </Text>

      <SimpleGrid
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
        cols={2}
        pt={30}
        mt={40}
        c="secondary"
      >
      
        <Paper
          p={{ sm: 32, base: 15 }}
    
          style={{
            background: "linear-gradient(#FBEEFF, #E1DFFF)",height:"250px"
          }}
          radius={10}
        >
          <Text fz={{ sm: 34, xs: 24, base: 18 }}>Mission</Text>
          <Text mt={8} fz={{ sm: 13, base: 10 }} ta={'justify'}>
          At Drive Test Pros, our mission is to pair students with qualified driving instructors, fostering a vibrant and encouraging environment for learning the art of driving. In order to streamline the way driving instruction is provided, we are committed to maintain a secure and user-centric platform
          </Text>
        </Paper>
        <Paper
          radius={10}
          p={{ sm: 32, base: 15 }}
          style={{
            background: "linear-gradient(#FFE0B1, #FBF1D4)",height:"250px"
          }}
        >
          <Text fz={{ sm: 34, xs: 24, base: 18}}>Vision</Text>
          <Text mt={8} fz={{ sm: 13, base: 10  }} ta={'justify'}>
          At Drive Test Pros, we envision a world where driving education is accessible, empowering, and fosters a community of safe and confident drivers. We strive to revolutionize the way people learn to drive, making it a seamless and enriching experience for learners and instructors alike. Our vision is to create a global driving education platform that brings learners and skilled instructors together, fostering a culture of responsible driving and lifelong learning
          </Text>
        </Paper>
      </SimpleGrid>
    </Box>
  );
};
