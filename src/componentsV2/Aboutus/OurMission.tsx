import { SimpleGrid, Stack, Box, Image, Text } from "@mantine/core";
const data = [
 
  {
    title: "Safe and Secure",
    content:
      "Our mission is to provide a seamless platform that empowers both instructors and learners to connect, learn, and progress in the world of driving education. ",
  },
];

export const OurMission = () => {
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
        })}
        src={"/images/homepageFrame.png"}
        alt="choose us"
      /> */}
      <div></div>
     
      <Stack
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 0,
          },
        })}
      >
      
        {data.map((d) => (
          <Box key={d.title}>
            {/* <Text fz={{ sm: 26, xs: 20, base: 18 }}>{d.title}</Text> */}
            <Text mt={5} c={"secondary"} fz={{ sm: 18, base: 15 }}>
              {d.content}
            </Text>
          </Box>
        ))}
      </Stack>
    </SimpleGrid>
  );
};
