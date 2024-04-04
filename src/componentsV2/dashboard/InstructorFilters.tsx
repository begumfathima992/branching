import { Box, Checkbox, Paper, Select, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

export const InstructorFilters = ({
  form,
  setFilters,
}: {
  form: UseFormReturnType<{
    price: string[];
    experience: string[];
    city: string;
  }>;
  setFilters?: (p: string) => void;
}) => {
  const Filters = [
    { label: "Lowest Price", value: "price" },
    { label: "Highest Price", value: "-price" },
  ];
  const price = [
    { label: "$ 5 - $ 50", value: "5-50" },
    { label: "$ 50 - $ 100", value: "50-100" },
    { label: "$ 100 - $ 500", value: "100-500" },
  ];
  const experience = [
    {
      label: "< 5 Years ",
      value: "-5",
    },
    {
      label: "5 - 10 Years ",
      value: "5-10",
    },
    {
      label: "> 10 Years ",
      value: "10",
    },
  ];
  return (
    <Paper
      withBorder
      sx={(theme) => ({
        [theme.fn.smallerThan("md")]: {
          border: "none !important",
        },
      })}
      p={10}
      radius={"md"}
      mb={10}
    >
      <Text
        display={{ md: "block", base: "none" }}
        mb={10}
        fw={600}
        fz={20}
        c={"secondary"}
      >
        Quick Filters
      </Text>
      <Stack>
        <Checkbox.Group
          label="Experience"
          {...form.getInputProps("experience", { type: "checkbox" })}
        >
          {experience.map((e) => (
            <Checkbox my={5} key={e.value} value={e.value} label={e.label} />
          ))}
        </Checkbox.Group>
        <Checkbox.Group
          label="Fares"
          {...form.getInputProps("price", { type: "checkbox" })}
        >
          {price.map((e) => (
            <Checkbox my={5} key={e.value} value={e.value} label={e.label} />
          ))}
        </Checkbox.Group>
        <Box display={{ md: "none", base: "block" }}>
          <Text fz={14} fw={500}>
            Sort by
          </Text>
          <Select
            onChange={setFilters}
            defaultValue={"price"}
            mt={5}
            data={Filters.map((p) => ({ label: p.label, value: p.value }))}
            searchable={false}
          />
        </Box>
      </Stack>
    </Paper>
  );
};
