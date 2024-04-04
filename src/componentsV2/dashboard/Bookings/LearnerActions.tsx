import { Group } from "@mantine/core";
import { useState } from "react";
import { ConfirmModal } from "../../../Modals/ConfirmModal";
import PaymentModal from "../../../Modals/PaymentModal";
import RescheduleModal from "../../../Modals/RescheduleModal";
import { IBookings } from "../../../types/IBooking";

const LearnerActions = ({ data }: { data: IBookings }) => {
  const [opened, setOpened] = useState(false);

  return (
    <Group noWrap spacing={6}>
      <PaymentModal data={data} />
      <RescheduleModal data={data} />
      <ConfirmModal
        booking_id={data.booking_id}
        opened={opened}
        setOpened={setOpened}
        name={data.instructor_name}
      />
    </Group>
  );
};

export default LearnerActions;
