import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FormEvent } from "react";
import { PaymentError } from "../svg/paymentError";

export const PaymentErrorModal = ({
  onClick,
  loading,
}: {
  onClick: (e: FormEvent) => Promise<void>;
  loading?: boolean;
}) => {
  const [opened, { close }] = useDisclosure(true);
  return (
    <Modal w={{ md: "50%" }} onClose={close} opened={opened}>
      <Stack>
        <Group position="center">
          <PaymentError height={60} width={60} />
        </Group>
        <Box>
          <Text ta={"center"} fz={28} fw={500}>
            Payment Failed
          </Text>
          <Text c={"secondary"}>
            We're sorry, but there was an issue processing your payment for the
            driving lesson.
          </Text>
        </Box>
        <Box c={"secondary"}>
          <Text>Possible reasons for failure</Text>
          <Box>
            <Text>-Insufficient funds</Text>
            <Text>-Incorrect card details </Text>
            <Text>-Connectivity issues</Text>
          </Box>
        </Box>
        <Box pt={10}>
          <Text>
            Please review your payment information and try again. Contact your
            bank for assistance.
          </Text>
          <Group mt={20} position="apart">
            <Button
              variant="outline"
              color="secondary"
              sx={{ flexGrow: 1 }}
              size="md"
              onClick={close}
            >
              GO BACK
            </Button>
            <Button
              loading={loading}
              onClick={onClick}
              fw={600}
              sx={{ flexGrow: 1 }}
              size="md"
            >
              {loading ? "processing" : "  RETRY PAYMENT"}
            </Button>
          </Group>
        </Box>
      </Stack>
    </Modal>
  );
};
