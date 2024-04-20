import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Paper } from "@mantine/core";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
// import ins1 from "../../Images/in1.png"

export const InstructorCarousel = () => {
  const data = [
    {
      src: "images/in1.png",
      price: "$60/hr",
      name: "James William",
    },
    {
      src: "images/in3.png",
      price: "$80/hr",
      name: "Juan Encalada",
    },
    {
      src: "images/in1.png",
      price: "$120/hr",
      name: "Charles Etoroma",
    },
    {
      src: "images/in4.png",
      price: "$50/hr",
      name: "Jurica Koletić",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      price: "$110/hr",
      name: "Joseph Gonzalez",
    },
    {
      src: "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      price: "$100/hr",
      name: "Mahdi Bafande",
    },
    {
      src: "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
      price: "$90/hr",
      name: "Jack Finnigan",
    },
    {
      src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      price: "$85/hr",
      name: "Charles Deluvio",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={2}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }}
      grabCursor={true}
      modules={[Autoplay, FreeMode]}
      freeMode={true}
    >
      {data.map((ins, index) => (
        <SwiperSlide key={index}>
          <Paper sx={{ overflow: "hidden" }} shadow="md" radius={10} h={200}>
            <Image
              height={"100%"}
              width={"100%"}
              sx={(theme) => ({
                borderRadius: 10,
                [theme.fn.smallerThan("md")]: {
                  objectFit: "contain",
                },
              })}
              src={ins.src}
              alt={ins.name}
            />
            <Box c={"#fff"} pos={"absolute"} bottom={20} left={20}>
              <Text>{ins.name}</Text>
              <Text>{ins.price}</Text>
            </Box>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
