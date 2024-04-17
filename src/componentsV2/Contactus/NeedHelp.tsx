import { SimpleGrid, Stack, Box, Image, Text } from "@mantine/core";
import img1 from '../../Images/img1.jpg'



const data = [
  
  {
 
    content:
    "We'd love to hear from you! Contact our dedicated support team at email@drivetestpros.com",
  },
  
];

export const NeedHelp = () => {
  return (
    <SimpleGrid
      breakpoints={[{ maxWidth: "md", cols: 1 }]}
      spacing={40}
      sx={{ alignItems: "center" }}
      py={80}
      cols={2}
    >
      {/* <Image
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 1,
          },
          width:"100px",

          height:"100px"
        })}
        src={img1}
        alt="choose us"
      /> */}
      <Image
  radius="md"
  h={200}
  src={"images/img1.jpg"}
 // Provide the correct path to the image

  alt="Image Description" // Add alt attribute for accessibility
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
            NeedHelp
          </Text>
          <Text ff={"Merriweather"} fz={{ sm: 38, xs: 28, base: 24 }}>
            Connect with our team to learn more{" "}
          </Text>
        </Box>
        {data.map((d) => (
          <Box >
            {/* <Text fz={{ sm: 26, xs: 20, base: 18 }}>{d.title}</Text> */}
            <Text mt={5} c={"secondary"} fz={{ sm: 16, base: 13 }}>
              {d.content}
            </Text>
          </Box>
        ))}
      </Stack>
    </SimpleGrid>
  );
};
