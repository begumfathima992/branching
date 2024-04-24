import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import { IoMdMail } from "react-icons/io";

export const Mail = () => {
  return (
    <Stack  spacing={40} h={20}>
      <Box sx={(theme) => ({
          border: "none",
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          borderTop:`1px solid ${theme.colors.gray[2]}`,
          paddingTop:"2rem",
          paddingBottom:"2rem"
        //   alignItems: "center",
        //   display: "flex",
        //   justifyContent: "space-between",
        })}>
        <SimpleGrid ta={{ sm: "center", base: "left" }}  spacing={10} >
          <Box ta={{ sm: "center", base: "left" }}  pt={4} pb={4}  >
            <IoMdMail  />
          </Box>
          <Stack spacing={1}>
            <Text fw={700} ff={"Merriweather"}>Hello World</Text>
            <Text ff={"Merriweather"}>Hello Worldlllll</Text>
            <a href="mailto:your.email@example.com">your.email@example.com</a>
          </Stack>
        </SimpleGrid>
      </Box>
    </Stack>
  );
};
