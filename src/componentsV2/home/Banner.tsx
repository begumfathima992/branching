import { Box, Center, Text,BackgroundImage } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import SearchBar from "../SearchBar";

export const Banner = () => {
  const [city, setCity] = useState<string | null>(null);

  const navigate = useNavigate();
  const { userDetails } = useAppSelector((state) => state.auth);
  return (




    // <Box maw={200} mx="auto">
    <BackgroundImage
    className="mantine-BackgroundImage-root"
      src={"images/background-img.png"}
      radius="sm"
      mx="auto"
    >
     <Center
      mih={{ sm: "45svh", base: "40svh" }}
      w={{ md: "900px", base: "100%" }}
      px={{ md: 60, base: 20 }}
      py={"sm"}
      mx={"auto"}
      sx={{maxWidth: "980px"}}
    >
      <Box ta={"center"}>
        <Text ff={"Merriweather"} fz={{ sm: 25, base: 24 }}>
          Discover the keys to safe driving with local driving instructors
        </Text>
        <Text fz={{ sm: 14, base: 12 }} c="gray.7">
          Drive Test Pros was born out of a passion for modernizing the way
          driving education is delivered.
        </Text>
        <Text fz={{ sm: 14, base: 12 }} c="gray.7">
          Our app allows learners and
          instructors to track progress, set goals, and celebrate achievements
          along the way.
        </Text>
        <Box mx={"auto"} pt={20} w={{ md: "771px", base: "100%" }}>
          <SearchBar
            withBorder
            setCity={setCity}
            {...(userDetails?.role === "LEARNER" && {
              onConfirm: () => {
                navigate("/dashboard/instructors", {
                  state: {
                    city,
                  },
                });
              },
            })}
            btnProps={{
              bg: "tertiary",
              sx: (theme) => ({
                ":hover": {
                  background: theme.colors.yellow[8],
                },
              }),
            }}
          />
        </Box>
      </Box>
    </Center>
    </BackgroundImage>
  // </Box>
   
  );
};
