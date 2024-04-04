import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PaymentSuccess } from "../svg/paymentSucces";
import { useLocation } from "react-router-dom";

export const PaymentSuccesModal = ({ onExit }: { onExit?: () => void }) => {
  const [opened, { close }] = useDisclosure(true);
  const { search } = useLocation();

  const detail = search.replaceAll("?", "").split("&").slice(0, 4);
  const bookingDetails: Record<string, unknown> = {};
  detail.forEach((item) => {
    let [key, value] = item.split("=");
    if (key === "name") key = "Instructor";
    bookingDetails[key] = decodeURIComponent(value);
  });
  return (
    <Modal
      w={{ md: "50%" }}
      onClose={() => {
        close();
        onExit && onExit();
      }}
      opened={opened}
      withCloseButton={false}
    >
      <Stack>
        <Group position="center">
          <PaymentSuccess height={60} width={60} />
        </Group>
        <Box ta={"center"}>
          <Text fz={28} fw={500}>
            Payment Sucessfull
          </Text>
          <Text c={"secondary"}>
            Congratulations! Your payment for the driving lesson has been
            successfully processed.
          </Text>
        </Box>
        <Box c={"secondary"}>
          <Text>Lesson Details:</Text>
          <Stack spacing={5} pt={10}>
            {Object.keys(bookingDetails).map((key, i) => (
              <Group c={"gray.7"} fz={14} key={i}>
                <Text tt={"capitalize"}>{key}: </Text>
                <Text tt={"capitalize"}>
                  {key === "price"
                    ? "$" + bookingDetails[key]
                    : key === "time"
                    ? String(bookingDetails[key])
                        .split("-")
                        .at(-1)
                        ?.substring(0, 4) +
                      "-" +
                      String(bookingDetails[key]).split("-")[0].substring(0, 5)
                    : String(bookingDetails[key])}{" "}
                </Text>
              </Group>
            ))}
          </Stack>
        </Box>
        <Box pt={10}>
          <Text>
            A confirmation email will be sent to you shortly with all the
            details.
          </Text>
          <Button
            mt={20}
            fullWidth
            size="md"
            onClick={() => {
              close();
              onExit && onExit();
            }}
          >
            DONE
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};
