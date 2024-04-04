import { Stack, Group, Button, Container, Text } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

export const Contactus = () => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <Stack
        bg={"gray.2"}
        p={60}
        fz={{ sm: 38, xs: 28, base: 24 }}
        ta={"center"}
        align="center"
      >
        <Text
          w={{ md: "500px", base: "100%" }}
          fz={{ sm: 42, xs: 28, base: 24 }}
          ff={"Merriweather"}
        >
          Ready to Join Us on This Journey
        </Text>
        <Text fz={{ sm: 16, base: 14 }}>
          Whether you're an enthusiastic learner ready to embark on your driving
          journey or a skilled driving instructor looking to make a positive
          impact, Drive Test Pros welcomes you with open arms. Let's transform
          driving education together and create a community that thrives on
          progress and achievement.
        </Text>
        <Group>
          <Button onClick={() => navigate(token ? "/dashboard" : "login")}>
            GET STARTED
          </Button>
          <Button variant="outline">CONTACT US</Button>
        </Group>
      </Stack>
      <Container
        my={80}
        size={1250}
        sx={{
          borderRadius: 30,
          background: "url(/images/contactusframe.jpg)",
          padding: "50px",
          backgroundPosition: "center",
        }}
      >
        <Stack c={"#fff"} align="flex-start">
          <Text
            ff={"Merriweather"}
            ta={{ sm: "left", base: "center" }}
            w={{ md: "660px", base: "100%" }}
            fz={{ sm: 38, xs: 28, base: 24 }}
          >
            You can become a great Driving Instructor too!
          </Text>
          <Text
            ta={{ sm: "left", base: "center" }}
            w={{ md: "683px", base: "100%" }}
            fz={{ sm: 18, base: 14 }}
          >
            Let's transform driving education together and create a community
            that thrives on progress and achievement.
          </Text>
          <Button
            mx={{ sm: 0, base: "auto" }}
            c={"#fff"}
            sx={{ borderColor: "#fff" }}
            variant="outline"
          >
            CONTACT US
          </Button>
        </Stack>
      </Container>
    </>
  );
};
