import { Container } from "@mantine/core";

// import { AboutUs } from "../componentsV2/home/AboutUs";
import { NeedHelp} from "../componentsV2/Contactus/NeedHelp";
import { ContactForm} from "../componentsV2/Contactus/ContactForm";
import { GetStartedAbout} from "../componentsV2/Aboutus/GetStartedAbout";
import { Mail} from "../componentsV2/Contactus/Mail";
// import { ChooseUs } from "../componentsV2/home/ChooseUs";
// import { Contactus } from "../componentsV2/home/Contactus";
// import { GetStarted } from "../componentsV2/home/GetStarted";
// import { LearnerCarousel } from "../componentsV2/home/LearnerCarousel";
// import { Offer } from "../componentsV2/home/Offer";
// import { InstructorCarousel } from "../componentsV2/home/InstructorCarousel";

const ContactPage = () => {
  return (
    <>
    <NeedHelp />

    <Container py={80} size={1270}>
     
    <Mail/>
     </Container>
      <Container py={80} size={1250}>
     
      <ContactForm/>
      </Container>
      <GetStartedAbout/>
  
    
    </>
  );
};

export default ContactPage;
