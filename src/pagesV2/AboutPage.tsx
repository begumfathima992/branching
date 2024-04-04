import { Container } from "@mantine/core";

import { AboutImage } from "../componentsV2/Aboutus/AboutImage";
import { AboutBanner } from "../componentsV2/Aboutus/AboutBanner";
import { OurMission } from "../componentsV2/Aboutus/OurMission";
import { OurStory } from "../componentsV2/Aboutus/OurStory";
import { GetStartedAbout} from "../componentsV2/Aboutus/GetStartedAbout";
import { AboutCard} from "../componentsV2/Aboutus/AboutCard";
// import { ChooseUs } from "../componentsV2/home/ChooseUs";
import { Contactus } from "../componentsV2/home/Contactus";
import { GetStarted } from "../componentsV2/home/GetStarted";
// import { GetStarted } from "../componentsV2/home/GetStarted";
// import { LearnerCarousel } from "../componentsV2/home/LearnerCarousel";
// import { Offer } from "../componentsV2/home/Offer";
// import { InstructorCarousel } from "../componentsV2/home/InstructorCarousel";

const AboutPage = () => {
  return (
    <>
      
      <Container py={80} size={1250}>
        <AboutBanner />
        <AboutImage/>
        <OurMission/>
        <AboutCard/>
        <OurStory/>
        <GetStartedAbout />
      </Container>
     
    
    </>
  );
};

export default AboutPage;
