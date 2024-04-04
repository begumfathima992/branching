import { Text } from "@mantine/core";
import { SimpleGrid, Paper, Stack, Box, List, Button } from "@mantine/core";
import {
  businessPlans,
  individualPlans,
  learnerPrices,
} from "../../constants/data";
import { AiOutlineCheck } from "react-icons/ai";

export const Prices = () => {
  return (
    <SimpleGrid
      cols={3}
      sx={{
        alignItems: "stretch",
      }}
      breakpoints={[
        {
          maxWidth: "sm",
          cols: 2,
        },
        {
          maxWidth: "xs",
          cols: 1,
        },
      ]}
    >
      <Paper withBorder p={10} h={"100%"} radius={0}>
        <Stack justify="space-between" h={"100%"}>
          <Box>
            <div>
              <Text fw={700} fz={{ sm: 26, base: 22 }} ta={"center"}>
                $19/mo Learner{" "}
              </Text>
              <Text ta={"center"}>Free</Text>
            </div>
            <List
              spacing={10}
              styles={{
                item: {
                  listStylePosition: "inside",
                },
              }}
              p={20}
              pt={30}
            >
              {learnerPrices.map((l) => (
                <List.Item
                  icon={<AiOutlineCheck color="green" />}
                  fz={14}
                  key={l}
                >
                  {l}
                </List.Item>
              ))}
            </List>
          </Box>
          <Button radius={0}>Get started</Button>
        </Stack>
      </Paper>
      <Paper withBorder p={10} radius={0} h={"100%"}>
        <Stack justify="space-between" h={"100%"}>
          <Box>
            <Text fw={700} fz={{ sm: 26, base: 22 }} ta={"center"}>
              Individual Instructor plans
            </Text>
            <List
              spacing={10}
              styles={{
                item: {
                  listStylePosition: "inside",
                },
              }}
              p={20}
              pt={40}
            >
              {individualPlans.map((l) => (
                <List.Item
                  icon={<AiOutlineCheck color="green" />}
                  fz={14}
                  key={l}
                >
                  {l}
                </List.Item>
              ))}
            </List>
          </Box>
          <Button radius={0}>Get started</Button>
        </Stack>
      </Paper>
      <Paper withBorder p={10} h={"100%"}>
        <Stack justify="space-between" h={"100%"}>
          <Box>
            <Text fw={700} fz={{ sm: 26, base: 22 }} ta={"center"}>
              Driving School Business
            </Text>
            <List
              styles={{
                item: {
                  listStylePosition: "inside",
                },
              }}
              p={20}
              pt={40}
              spacing={10}
            >
              {businessPlans.map((l) => (
                <List.Item
                  icon={<AiOutlineCheck color="green" />}
                  fz={14}
                  key={l}
                >
                  {l}
                </List.Item>
              ))}
            </List>
          </Box>
          <Button radius={0}>Get started</Button>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
};
