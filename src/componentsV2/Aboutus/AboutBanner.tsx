import { Box, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";

export const AboutBanner = () => {
  return (
    <Box>
      <Text fw={700} fz={18} c={"brand"}>
        About Us
      </Text>
      <Text ff={"Merriweather"} fz={{ sm: 40, xs: 30, base: 26 }}>
        Discover the
        <Text ff={"Merriweather"} component="span" fw={700} className="abt-future">
          {" "}
          Future{" "}
        </Text>
        of Driving
        <Text >
        {" "}
         Education with
        <Text ff={"Merriweather"} component="span" fw={700}>
          {" "}
          Drive Test Pros{" "}
        </Text>
      </Text>
        
      </Text>
      
      
     

      <SimpleGrid
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
        cols={2}
        // pt={60}
        c="secondary"
      >
        
         
          <Text mt={10} fz={{ sm: 18, base: 15}} ta={'justify'}>
          Welcome to Drive Test Pros, where driving instructors and learners come together to enhance Learner's 
            driving test
          </Text>
        
       
      </SimpleGrid>
    </Box>
  );
};
