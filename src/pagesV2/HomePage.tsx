import { Container } from "@mantine/core";

import { AboutUs } from "../componentsV2/home/AboutUs";
import { Banner } from "../componentsV2/home/Banner";
import { ChooseUs } from "../componentsV2/home/ChooseUs";
import { Contactus } from "../componentsV2/home/Contactus";
import { GetStarted } from "../componentsV2/home/GetStarted";
import { LearnerCarousel } from "../componentsV2/home/LearnerCarousel";
import { Offer } from "../componentsV2/home/Offer";
import { InstructorCarousel } from "../componentsV2/home/InstructorCarousel";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Container py={80} size={1250}>
        <AboutUs />
       
      </Container>
      <InstructorCarousel />
      <Container py={80} size={1250}>
    
        <ChooseUs />
        <Offer />
        <GetStarted />
      </Container>
      <LearnerCarousel />
      <Contactus />
    
    </>
  );
};

export default HomePage;
