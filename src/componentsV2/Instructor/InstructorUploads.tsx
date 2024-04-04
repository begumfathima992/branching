import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import { IInstructorProfileById } from "../../types/IInstructor";

export const InstructorUploads = ({ data }: { data: IInstructorProfileById }) => {
  const uploads = [
    {
      label: "Instructing Plate",
      img: data.instructor.vehicle_number,
    },
    {
      label: "Driving License",
      img: data.instructor.license_name,
    },
    {
      label: "Instructing license",
      img: data.instructor.instructing_license,
    },
  ];
  return (
    <Paper withBorder radius={"md"} py={20} px={10}>
      <Stack>
        <Text fw={600} fz={18}>
          Uploads
        </Text>
        <Group>
          {uploads.map((t, i) => (
            <Paper
              withBorder
              key={i}
              radius={"md"}
              h={150}
              w={200}
              pos={"relative"}
              sx={{ overflow: "hidden", cursor: "pointer" }}
            >
              {t.img && <img src={t.img} alt={t.label} />}
              <Box
                bg={"#110000"}
                pos={"absolute"}
                h={"25%"}
                left={0}
                bottom={0}
                w={"100%"}
                sx={(theme) => ({
                  borderRadius: `0px 0px ${theme.radius.md} ${theme.radius.md}`,
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                })}
                c={"#fff"}
                ta={"center"}
              >
                {t.label}
              </Box>
            </Paper>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
};