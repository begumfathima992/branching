import {
  Button,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useCancelBookingMutation } from "../store/slices/bookingApiSlice";
import { handleResponse } from "../utils/responseHandler";

type ConfirmModalProps = {
  name?: string;
  booking_id: number;
  opened: boolean;
  setOpened: (val: boolean) => void;
} & Partial<ModalProps>;

export const ConfirmModal = ({
  name,
  setOpened,
  booking_id,
  opened,
  ...props
}: ConfirmModalProps) => {
  const [cancelBooking, { isLoading }] = useCancelBookingMutation();
  return (
    <>
      <Tooltip label="decline">
        <Button
          onClick={() => setOpened(true)}
          color="red"
          variant="outline"
          compact
        >
          DECLINE
        </Button>
      </Tooltip>
      <Modal
        styles={{
          body: {
            padding: "0",
            paddingBottom: 0,
          },
        }}
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside={false}
        {...props}
      >
        {isLoading && (
          <LoadingOverlay
            visible={true}
            loader={<Loader variant="dots" size={"lg"} />}
          />
        )}
        <Stack p={20}>
          <Text fw={500}>Confirm Action</Text>
          <Text fz={14} c={"secondary"}>
            Are you sure you want to declined {name} Request. This action cannot
            be undone.
          </Text>
        </Stack>
        <Divider />
        <Group
          pr={20}
          position="right"
          sx={(theme) => ({
            borderTop: `1px solid ${theme.colors.gray[3]}`,
          })}
          py={10}
        >
          <UnstyledButton
            disabled={isLoading}
            onClick={() => setOpened(false)}
            c={"gray"}
            fw={500}
          >
            Cancel
          </UnstyledButton>
          <Button
            loading={isLoading}
            onClick={async () => {
              const res = await cancelBooking({ booking_id });
              handleResponse(res, {
                onSuccess: () => setOpened(false),
              });
            }}
            sx={{
              ":hover": {
                background: "transparent",
              },
            }}
            bg={"transparent"}
            c={"red.8"}
            fw={500}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};
