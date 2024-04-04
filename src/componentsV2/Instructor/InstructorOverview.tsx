import {
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text
} from "@mantine/core";
import { IInstructorProfileById } from "../../types/IInstructor";
import { DetailsLayout } from "../dashboard/Instructor/DetailsLayout";
import { InstructorReviews } from "./InstructorReviews";

const InstructorOverview = ({
  data,
  setOpened,
}: {
  data: IInstructorProfileById;
  setOpened: (o: boolean) => void;
}) => {
  const detailsToShow = [
    { label: "Name", content: data.instructor.full_name },
    { label: "Contact", content: data.instructor.contact },
    { label: "Experience(year)", content: data.instructor.year_of_exp },
    { label: "Car Model", content: data.instructor.car_model },
    { label: "Country", content: data.instructor.country },
    { label: "Languages", content: data.instructor.languages },
    { label: "Cities Operate", content: data.instructor.cities },
  ];
  return (
    <Stack>
      <Paper withBorder radius={"md"} px={10} pt={20} pb={80}>
        <Stack>
          <Group position="apart">
            <Text fw={600} fz={18}>
              Profile
            </Text>
            <Button
              onClick={() => setOpened(true)}
              display={{ md: "none", base: "block" }}
            >
              BOOK NOW
            </Button>
          </Group>
          <Divider />
          {/* <Text fz={14} c={"secondary"}>
            If you are looking for a shared apartment in Highland, Austin, you
            can choose this newly refurbished shared apartment on the 1st floor
            with a total size of 1390 sq. ft. with 3 other roommates or you can
            rent this entire shared apartment on your own - if available. You
            can request to have your bedroom furnished or unfurnished.
          </Text> */}
          <Stack pt={20}>
            {detailsToShow.map((d, i) => (
              <DetailsLayout label={d.label} key={i} content={d.content} />
            ))}
          </Stack>
        </Stack>
      </Paper>
      {/* <InstructorUploads data={data} /> */}
      <InstructorReviews data={data} />
    </Stack>
  );
};





export default InstructorOverview;
