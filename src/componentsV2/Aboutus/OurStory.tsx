import { Box, Image, SimpleGrid, Stack, Text } from "@mantine/core";



export const OurStory = () => {
  return (
    <Stack pt={80} spacing={40}>
      <Box>
        <Text ta={{ sm: "center", base: "left" }} fw={700} c={"brand"}>
         Our Story
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
         Drive Test Pros was born out of a passion for modernizing  the way driving education is delivered.Our team recognised the need for a comprehensive solution that brings instructors and learners closer,making the processof learning to drive more efficient ,interactive,and enjoyable.With a focus on technology,Innovation,and user experience,We embarked on a journey to create an app that transforms the way people learn to drive 
          </Text>
      </Box>
     
    </Stack>
  );
};
