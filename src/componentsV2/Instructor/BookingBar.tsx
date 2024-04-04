import {
  Badge,
  Box,
  Drawer,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { toast } from "react-toastify";
import useCustomForm from "../../hooks/useCustomForm";
import { useAppSelector } from "../../store/hooks";
import {
  useCreateBookingMutation,
  useGetAvailableBookingTimesMutation,
} from "../../store/slices/bookingApiSlice";
import { formatedDate } from "../../utils/formateDate";
import { handleResponse } from "../../utils/responseHandler";

const BookingBar = ({
  opened,
  setOpened,
  id,
}: {
  opened: boolean;
  setOpened: (val: boolean) => void;
  id: string;
}) => {
  const [availableTime, setAvailableTime] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const { userDetails } = useAppSelector((state) => state.auth);

  const [getAvailableTimes, { isLoading, data }] =
    useGetAvailableBookingTimesMutation();
  const [createBooking, { isLoading: creatingBooking }] =
    useCreateBookingMutation();

  const { render: bookingInfos, form } = useCustomForm({
    initialValues: {
      // name: "",
      // email: "",
      // phone_no: "",
      comments: "",
    },
    inputfields: {
      // email: {
      //   type: "email",
      //   placeholder: "Email*",
      // },
      // name: {
      //   type: "text",
      //   placeholder: "Full Name*",
      // },
      // phone_no: {
      //   type: "number",
      //   placeholder: "Phone No.*",
      // },
      comments: {
        type: "textarea",
        placeholder: "Request(optional)",
        minRows: 2,
      },
    },
    buttonProps: {
      size: "lg",
      fw: 600,
      tt: "capitalize",
    },
    isLoading: creatingBooking,
  });


  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      position="right"
      scrollAreaComponent={ScrollArea.Autosize}
      withCloseButton={false}
      title="Book Appointment Online"
      styles={(theme) => ({
        title: {
          fontSize: 18,
          fontWeight: 500,
          color: theme.colors.secondary[0],
        },
      })}
    >
      <Paper pt={40} radius={"md"}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            if (!formatedDate(date as Date) || !availableTime) {
              toast.error("Please select date and time!!");
              return;
            }

            const data = {
              ...values,
              date: formatedDate(date as Date),
              instructor_id: Number(id),
              learner_id: userDetails?.learner_id as number,
              time: availableTime,
            };
            const res = await createBooking(data);
            handleResponse(res, {
              onSuccess: () => setOpened(false),
            });
          })}
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
                    instructor_id: Number(id),
                  });
                }
              }}
            />
            <Box>
              {data && (
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
                  : data &&
                    data?.times.map(
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
              {bookingInfos}
            </Box>
          </Stack>
        </form>
      </Paper>
      <Paper
        withBorder
        radius={"sm"}
        mt={20}
        w={"100%"}
        h={200}
        sx={{ overflow: "hidden" }}
      >
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27776831089!2d85.2849327737824!3d27.709030242177548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1691615366645!5m2!1sen!2snp"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          width={"100%"}
          height={"100%"}
        />
      </Paper>
    </Drawer>
  );
};

export default BookingBar;
