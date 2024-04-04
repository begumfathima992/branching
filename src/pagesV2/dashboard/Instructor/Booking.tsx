import { Tabs, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { UpcomingBookings } from "../../../componentsV2/dashboard/Bookings/UpcomingBookings";
import { PastBooking } from "../../../componentsV2/dashboard/Bookings/PastBookings";

const InstructorBookings = () => {
  const { view } = useParams();
  const navigate = useNavigate();

  return (
    <Tabs
      value={view}
      defaultValue={"upcoming"}
      onTabChange={(value) =>
        navigate(`/dashboard/bookings/${value}`, {
          state: { title: "Booking", withBackBtn: false },
        })
      }
      keepMounted={false}
    >
      <Tabs.List pt={15}>
        <Tabs.Tab value="upcoming">
          <Text
            c={view === "upcoming" ? "brand" : "secondary"}
            fw={view === "upcoming" ? 600 : 500}
          >
            Upcoming Booking
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value="past">
          <Text
            c={view === "past" ? "brand" : "secondary"}
            fw={view === "past" ? 600 : 500}
          >
            Past Booking
          </Text>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="upcoming">
        <UpcomingBookings />
      </Tabs.Panel>
      <Tabs.Panel value="past">
        <PastBooking />
      </Tabs.Panel>
    </Tabs>
  );
};

export default InstructorBookings;
