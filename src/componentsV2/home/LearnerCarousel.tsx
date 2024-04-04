import { Image, Text } from "@mantine/core";
import { Box } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";

const list = [
  "/images/learner1.png",
  "/images/learner2.png",
  "/images/learner1.png",
  "/images/learner2.png",
];

export const LearnerCarousel = () => {
  return (
    <Box
      c={"#fff"}
      py={{ sm: 80, base: 40 }}
      ta={"center"}
      bg={"brand"}
      sx={() => ({
        borderRadius: "120px 120px 0px 0px",
      })}
    >
      <Box px={{ sm: 80, base: 20 }}>
        <Text ff={"Merriweather"} fw={700}>
          Get Started
        </Text>
        <Text ff={"Merriweather"} fz={{ sm: 50, xs: 32, base: 28 }}>
          Track learner Progress
        </Text>
        <Text pt={40} fz={{ sm: 16, base: 14 }}>
          Welcome to Drive Test Pros, where driving instructors and learners
          come together to enhance Learner's driving test journey. Our mission
          is to provide a seamless platform that empowers both instructors and
          learners to connect, learn, and progress in the world of driving
          education. Our mission is to provide a seamless platform that empowers
          both instructors and learners to connect, learn, and progress in the
          world of driving education.
        </Text>
      </Box>
      <Swiper
        style={{
          paddingTop: 40,
        }}
        spaceBetween={30}
        grabCursor={true}
        slidesPerView={2}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {list.map((img, index) => (
          <SwiperSlide key={index}>
            <Box h={200}>
              <Image
                height={"100%"}
                width={"100%"}
                src={img}
                alt={`learner${index}`}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
