import { Box, Image, SimpleGrid, Stack, Text } from "@mantine/core";

const data = [
  {
    img: "/images/getstarted1.png",
    title: "Research",
    content:
      "Drive Test Pros was born out of a passion for modernizing the way driving education is delivered. Our team recognized the need for a comprehensive solution that brings instructors and learners closer, making the process of learning to drive more efficient, interactive, and enjoyable. With a focus on technology, innovation, and user experience, we embarked on a journey to create an app that transforms the way people learn to drive.",
    direction: "ltr",
  },
  {
    img: "/images/getstarted2.png",
    title: "Contact",
    content:
      "Drive Test Pros was born out of a passion for modernizing the way driving education is delivered. Our team recognized the need for a comprehensive solution that brings instructors and learners closer, making the process of learning to drive more efficient, interactive, and enjoyable. With a focus on technology, innovation, and user experience, we embarked on a journey to create an app that transforms the way people learn to drive.",
    direction: "rtl",
  },
  {
    img: "/images/getstarted3.png",
    title: "Book",
    content:
      "Drive Test Pros was born out of a passion for modernizing the way driving education is delivered. Our team recognized the need for a comprehensive solution that brings instructors and learners closer, making the process of learning to drive more efficient, interactive, and enjoyable. With a focus on technology, innovation, and user experience, we embarked on a journey to create an app that transforms the way people learn to drive.",
    direction: "ltr",
  },
];

export const GetStarted = () => {
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
          Finding the
          <Text ff={"Merriweather"} component="span" fw={700}>
            {" "}
            Driving Instructor{" "}
          </Text>
          has never been this easy
        </Text>
      </Box>
      {data.map((gs) => (
        <SimpleGrid
          breakpoints={[
            {
              maxWidth: "md",
              cols: 1,
            },
          ]}
          c={"secondary"}
          spacing={80}
          sx={{
            alignItems: "center",
          }}
          cols={2}
          key={gs.title + gs.content}
        >
          <Stack
            {...(gs.direction === "rtl" && {
              sx: {
                order: 1,
              },
            })}
          >
            <Text fz={{sm: 26, base: 22}}>{gs.title}</Text>
            <Text fz={{sm: 16, base: 14}} ta={'justify'}>{gs.content}</Text>
          </Stack>
          <Image
            {...(gs.direction === "rtl" && {
              style: {
                order: 0,
              },
            })}
            src={gs.img}
            alt={gs.title}
          />
        </SimpleGrid>
      ))}
    </Stack>
  );
};
