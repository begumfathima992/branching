import { Group, Tooltip, Button } from "@mantine/core";
import { ConfirmModal } from "../../../Modals/ConfirmModal";
import { useState } from "react";
import { useApproveBookingMutation } from "../../../store/slices/bookingApiSlice";
import { handleResponse } from "../../../utils/responseHandler";
import { IBookings } from "../../../types/IBooking";

const InstructorActions = ({ data }: { data: IBookings }) => {
  const [opened, setOpened] = useState(false);
  const [approveBooking, { isLoading }] = useApproveBookingMutation();
  return (
    <Group noWrap spacing={6}>
      <Tooltip label="accept">
        <Button
          color="green"
          compact
          loading={isLoading}
          onClick={async () => {
            const res = await approveBooking({ booking_id: data.booking_id });
            handleResponse(res);
          }}
        >
          ACCEPT
        </Button>
      </Tooltip>
      <ConfirmModal
        booking_id={data.booking_id}
        opened={opened}
        setOpened={setOpened}
        name={data.learner_name}
      />
    </Group>
  );
};

export default InstructorActions;
