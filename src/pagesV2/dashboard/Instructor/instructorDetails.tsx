import { Box, Grid, Paper, Tabs } from "@mantine/core";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BookingBar from "../../../componentsV2/Instructor/BookingBar";
import InstructorInfo from "../../../componentsV2/Instructor/InstructorDetails";
import InstructorOverview from "../../../componentsV2/Instructor/InstructorOverview";
import LoaderUi from "../../../componentsV2/LoaderUi";
import { useGetInstructorByIdQuery } from "../../../store/slices/instructorApiSlice";

const InstructorDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const { data, isLoading } = useGetInstructorByIdQuery(
    { id: id as string },
    {
      skip: !id,
    }
  );

  const [opened, setOpened] = useState((state && state?.opened) || false);

  if (!data || isLoading) return <LoaderUi h={"70vh"} />;

  return (
    <>
      <Grid p={20} align={"stretch"}>
        <Grid.Col md={3}>
          <Box
            sx={{ flexGrow: 1, zIndex: 9 }}
            pos={"sticky"}
            display={{ md: "block", base: "none" }}
            top={120}
          >
            <InstructorInfo setOpened={setOpened} data={data} />
          </Box>
        </Grid.Col>
        <Grid.Col md={9} span={12}>
          <Tabs
            defaultValue="overview"
            keepMounted={false}
            styles={{ tabsList: { border: "none" } }}
          >
            <Paper
              withBorder
              radius={"md"}
              px={20}
              pb={2}
              pt={20}
              sx={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                zIndex: 9,
              }}
              pos={"sticky"}
              top={{ md: 110, base: 125 }}
            >
              <Tabs.List>
                <Tabs.Tab fw={500} c={"secondary"} value="overview">
                  Overview
                </Tabs.Tab>
                {/* <Tabs.Tab fw={500} c={"secondary"} value="history">
                  History
                </Tabs.Tab> */}
              </Tabs.List>
            </Paper>
            <Tabs.Panel value="overview" pt="xs">
              <InstructorOverview setOpened={setOpened} data={data} />
            </Tabs.Panel>
            {/* <Tabs.Panel value="history" pt="xs">
              <ScrollArea h={"100vh"}>
                <IntructorHistory />
              </ScrollArea>
            </Tabs.Panel> */}
          </Tabs>
        </Grid.Col>
        <BookingBar id={id as string} opened={opened} setOpened={setOpened} />
      </Grid>
    </>
  );
};

export default InstructorDetails;
