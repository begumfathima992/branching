import {
  Badge,
  Box,
  Button,
  Group,
  Modal,
  ModalProps,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAvailableBookingTimesMutation,
  useRescheduleBookingMutation
} from "../store/slices/bookingApiSlice";
import { IBookings } from "../types/IBooking";
import { handleResponse } from "../utils/responseHandler";
import { formatedDate } from "../utils/formateDate";

type RescheduleModalProps = Omit<ModalProps, "opened" | "onClose"> & {
  data: IBookings;
};

const RescheduleModal = ({ data, ...props }: RescheduleModalProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [availableTime, setAvailableTime] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const [getAvailableTimes, { isLoading, data: timeStamps }] =
    useGetAvailableBookingTimesMutation();
  const [resheduleBooking, { isLoading: rescheduling }] =
    useRescheduleBookingMutation();

  return (
    <>
      <Tooltip label="reschedule booking">
        <Button onClick={open} color="blue.8" compact>
          RESCHEDULE
        </Button>
      </Tooltip>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        {...props}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
           
            if (!formatedDate(date as Date) || !availableTime) {
              toast.error("Please select date and time!!");
              return;
            }

            const params = {
              booking_id: data.booking_id,
              time: availableTime,
              date: formatedDate(date as Date),
            };

            const res = await resheduleBooking(params);
            handleResponse(res, {
              onSuccess: () => close(),
            });
          }}
        >
          <Stack>
            <DateInput
              valueFormat="YY/MM/D"
              placeholder="pick a date*"
              styles={(theme) => ({
                input: { cursor: "pointer" },
                label: { fontSize: 13, fontWeight: 600, color: "#000" },
              })}
              minDate={new Date()}
              label="Choose a date to get available dates"
              onChange={async (e) => {
                setDate(e);
                const date =
                  e && `${e.getFullYear()}-${e.getMonth()}-${e.getDay()}`;
                if (date) {
                  await getAvailableTimes({
                    date,
                    instructor_id: Number(data.instruction_id),
                  });
                }
              }}
            />
            <Box>
              {timeStamps && (
                <>
                  <Text fz={13} fw={600}>
                    Time
                  </Text>
                  <Text fz={12} c={"gray.7"}>
                    Choose an available time slot
                  </Text>
                </>
              )}
              <Group py={10} spacing={8}>
                {isLoading
                  ? Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton radius={0} h={20} key={i} w={50} />
                      ))
                  : timeStamps &&
                    timeStamps?.times.map(
                      (t, i) =>
                        !t.is_taken && (
                          <Badge
                            key={i}
                            sx={(theme) => ({
                              cursor: "pointer",
                              border: `1px solid ${theme.colors.gray[4]}`,
                              borderColor:
                                availableTime === t.time
                                  ? theme.colors.cyan[3]
                                  : theme.colors.gray[2],
                              ":hover": {
                                background: theme.colors.cyan[3],
                                borderColor: theme.colors.cyan[3],
                                color: "#fff",
                              },
                            })}
                            bg={availableTime === t.time ? "cyan.3" : "#DEE0E4"}
                            radius={0}
                            onClick={() => setAvailableTime(t.time)}
                            c={availableTime === t.time ? "#fff" : "secondary"}
                          >
                            {t.time}
                          </Badge>
                        )
                    )}
              </Group>
            </Box>
          <Button type="submit" fullWidth tt="uppercase" loading={rescheduling} size="lg">
            {!rescheduling && "Submit"}
          </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default RescheduleModal;
