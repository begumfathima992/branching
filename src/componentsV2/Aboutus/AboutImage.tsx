import { SimpleGrid, Stack, Box, Image, Text } from "@mantine/core";


export const AboutImage = () => {
  return (
    <SimpleGrid
      breakpoints={[{ maxWidth: "md", cols: 1 }]}
      spacing={40}
      sx={{ alignItems: "center" }}
      py={80}
     
    >
      {/* <Image
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 1,
          },
        })}
        src={"/images/car.jpg"}
        alt="choose us"
      /> */}
       <Image
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 1,
          },
        })}
        src={"/images/Rectangle 3992 (1).png"}
        
      />
    
    </SimpleGrid>
  );
};
