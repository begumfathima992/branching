import {
  Center,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IInstructorProfile } from "../../../types/IInstructor";
import { EditInstrutorProfileIconIcon } from "./EditInstrutorProfileIconIcon";
import { DetailsLayout } from "./DetailsLayout";
import { ImagePriviewer } from "../../ImagePreviewer";

export const InstructorPreferences = ({
  data,
}: {
  data: IInstructorProfile;
}) => {
  const navigate = useNavigate();

  const details = [
    {
      label: "Price ",
      content: `$${data.instructor.price}/hr`,
    },
    {
      label: "Experience (Years)",
      content: data.instructor.year_of_exp,
    },
    {
      label: "Cities Operate",
      content: data.instructor.cities,
    },
    {
      label: "Brand",
      content: data.instructor.car_model,
    },
    { label: "Languages Spoken", content: data.instructor.languages },
  ];

  return (
    <Paper withBorder radius={5} p={10}>
      <Group noWrap position="apart">
        <Text fz={18} fw={500}>
          Preferences{" "}
        </Text>
        <EditInstrutorProfileIconIcon
          onClick={() =>
            navigate("/dashboard/profile/preference", {
              state: { title: "Profile Edit", withBackBtn: true },
            })
          }
        />
      </Group>
      <Divider my={10} />
      <Stack spacing={13}>
        {details.map((d, i) => (
          <DetailsLayout key={d.label + i} {...d} />
        ))}
        <SimpleGrid cols={3}>
          <ImagePriviewer
            imgsrc={data.instructor.vehicle_number}
            label="Vehicle Registration "
            alt="Vehicle Registration "
          />
          <ImagePriviewer
            imgsrc={data.instructor.instructing_license}
            label="Instructing License"
            alt="Instructing License"
          />
          <ImagePriviewer
            imgsrc={data.instructor.license_name}
            label="Driving License"
            alt="Driving License"
          />
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};
