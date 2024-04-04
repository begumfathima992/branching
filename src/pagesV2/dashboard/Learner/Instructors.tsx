import {
  Box,
  Button,
  Center,
  Drawer,
  Flex,
  Grid,
  Group,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
import { MdOutlineSort } from "react-icons/md";
import { useLocation } from "react-router-dom";
import InstructorCard from "../../../componentsV2/Instructor/InstructorCard";
import { NotFound } from "../../../componentsV2/NotFound";
import SearchBar from "../../../componentsV2/SearchBar";
import { InstructorFilters } from "../../../componentsV2/dashboard/InstructorFilters";
import { CardLoadingSkeleton } from "../../../componentsV2/skeletons/CardLoadingSkeleton";
import { useLazyGetFilteredInstructorsQuery } from "../../../store/slices/instructorApiSlice";

export const Instructors = () => {
  const path = useLocation();
  const city = path.state && path.state.city ? path.state.city : null;
  const [opened, setOpened] = useState(false);
  const Filters = [
    { label: "Lowest Price", value: "price" },
    { label: "Highest Price", value: "-price" },
  ];
  const [price, setPrice] = useState<string>("price");
  const form = useForm({
    initialValues: {
      city: city || "",
      price: [] as string[],
      experience: [] as string[],
    },
  });
  const [getFilteredInstructors, { isLoading, data, isFetching }] =
    useLazyGetFilteredInstructorsQuery();
  const instructorsAvailable = data?.instructors?.length;
  const instructorsAvailableText =
    instructorsAvailable && instructorsAvailable > 0
      ? "Instructors"
      : "Instructor";

  useEffect(() => {
    getFilteredInstructors({
      city: form.values.city !== "all" ? form.values.city : "",
      experience: (form.values.experience.at(-1) as string) || "",
      price: (form.values.price.at(-1) as string) || "",
      sort_by: price,
    });
  }, [form.values, price, path.state]);

  return (
    <Box pt={30}>
      <Grid
        mx={20}
        px={10}
        bg={"brand"}
        sx={{ borderRadius: "10px" }}
        mih={{ xs: "40vh", base: "50vh" }}
        pos={"relative"}
      >
        <Grid.Col md={7} span={12} sx={{ zIndex: 2 }}>
          <Center h={"100%"}>
            <Stack c="#fff" spacing={10}>
              <Text fw={600} fz={24}>
              Unlock the Secrets of Safe Driving with Nearby Driving Instructors
              </Text>
              <Text fz={14} c={"gray.4"}>
              Take advantage of our top-notch driving instructors assistance to drive with confidence on the roads.
              </Text>
              <SearchBar form={form} />
            </Stack>
          </Center>
        </Grid.Col>
        <Grid.Col md={5} span={12} h="100%"></Grid.Col>
      </Grid>
      <Grid px={20} pt={40}>
        <Grid.Col md={9} span={12}>
          <Text c={"secondary"} fw={600} fz={22}>
            Instructors Near You
          </Text>
          <Group position="apart" noWrap fz={14} c="gray.6" mt={20}>
            <Text>
              {isLoading
                ? "loading..."
                : instructorsAvailable +
                  " driving " +
                  instructorsAvailableText +
                  " available."}
            </Text>
            <Group spacing={5} display={{ md: "none", base: "flex" }}>
              <Text>Filters:</Text>
              <ThemeIcon
                onClick={() => setOpened(true)}
                bg={"gray.2"}
                c="brand"
                radius={"50%"}
                size={"lg"}
              >
                <LuFilter />
              </ThemeIcon>
            </Group>
            <Group spacing={5} display={{ md: "flex", base: "none" }}>
              <MdOutlineSort />
              <Text>Sort By:</Text>
              <Menu>
                <Menu.Target>
                  <UnstyledButton
                    display={"flex"}
                    sx={(theme) => ({
                      justifyContent: "center",
                      alignItems: "center",
                      columnGap: 5,
                      cursor: "default",
                      fontSize: 14,
                      color: theme.colors.gray[7],
                    })}
                  >
                    {Filters.find((f) => f.value === price)?.label || "sort"}{" "}
                    <BiChevronDown />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {Filters.map((s, i) => (
                    <Menu.Item key={i} onClick={() => setPrice(s.value)}>
                      {s.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
          <SimpleGrid
            cols={
              isLoading || isFetching
                ? 3
                : !data || data?.instructors.length === 0
                ? 1
                : 3
            }
            pt={20}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            {isLoading || isFetching ? (
              Array(3)
                .fill(0)
                .map((_, i) => <CardLoadingSkeleton key={i} />)
            ) : !data || data?.instructors.length === 0 ? (
              <NotFound h={"50vh"} />
            ) : (
              data?.instructors.map((i) => (
                <InstructorCard key={i.profile_id} data={i} />
              ))
            )}
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col
          display={{ md: "block", base: "none" }}
          md={3}
          span={12}
          pt={80}
        >
          <InstructorFilters form={form} />
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            position="right"
            title={
              <Text mb={10} fw={600} fz={20} c={"secondary"}>
                Quick Filters
              </Text>
            }
          >
            <Flex
              direction={"column"}
              justify={"space-between"}
              h={"85svh"}
              w={"100%"}
            >
              <InstructorFilters setFilters={setPrice} form={form} />
              <Button fullWidth size="lg" onClick={() => setOpened(false)}>
                Close
              </Button>
            </Flex>
          </Drawer>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
