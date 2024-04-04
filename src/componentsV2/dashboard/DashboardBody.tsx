import { Grid, Stack } from "@mantine/core";
import { DashboardBookingsTable } from "./DashboardBookingsTable";
import { DashboardPaymentsTable } from "./DashboardPaymentsTable";
import { DashboardReviewsTable } from "./DashboardReviewsTable";
import { DashboardStats } from "./DashboardStats";
import { UserDetails } from "./UserDetails";

export const DashboardBody = () => {
  return (
    <Grid p={20} align="flex-start">
      <Grid.Col md={3}>
        <UserDetails />
      </Grid.Col>
      <Grid.Col md={6} orderMd={1} order={2}>
        <Stack>
          <DashboardBookingsTable />
          <DashboardPaymentsTable />
          <DashboardReviewsTable />
        </Stack>
      </Grid.Col>
      <Grid.Col md={3} orderMd={2} order={1}>
        <DashboardStats />
      </Grid.Col>
    </Grid>
  );
};
