import { Box, BoxProps, Flex } from "@mantine/core";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai'; // Import the Close icon from react-icons/ai

export const Prompt = ({
  text,
  ...props
}: { text?: React.ReactNode } & Partial<BoxProps>) => {
  return (
    <Box
      pos="sticky"
      top={0}
      bg="tertiary"
      py={10}
      ta="center"
      fz={{ xs: 12, base: 10 }}
      fw={600}
      sx={{ zIndex: 10 }}
      px={{ xs: 0, base: 15 }}
      display="block"
      {...props}
    >
      <Flex   style={{ gap: "10px" }}>
        {/* Charging icon on the left */}
      
        <BsLightningChargeFill size={24} />
        
        {/* Prompt text */}
        {text ||
          "Driving instructors and Learners come together to enhance Learner's driving test journey."}
        
        {/* Close icon on the right */}
        <AiOutlineClose size={18} className="closeIcon" />
      </Flex>
    </Box>
  );
};
