import {
  Box,
  Button,
  Loader,
  LoadingOverlay,
  Modal,
  ModalProps,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { CheckoutForm } from "../componentsV2/auth/CheckoutForm";
import {
  usePaymentMutation,
  useStripeConfigQuery,
} from "../store/slices/authApiSlice";
import { IBookings } from "../types/IBooking";

type PaymentModalProps = Omit<ModalProps, "opened" | "onClose"> & {
  data: IBookings;
};

const PaymentModal = ({
  data: bookingDetails,
  ...props
}: PaymentModalProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [clientSecret, setClientSecret] = useState("");

  const [stripePayment, { isLoading }] = usePaymentMutation();
  const { data, isLoading: loadingConfig } = useStripeConfigQuery(undefined, {
    skip: !opened,
  });

  return (
    <>
      <Tooltip label="proceed to pay">
        <Button
          onClick={async () => {
            open();
            const res = await stripePayment({
              amount:
                Number(bookingDetails.instructor_price) *
                bookingDetails.instructor_price_per_hour,
              booking_id: bookingDetails.booking_id,
            });
            if ("data" in res) {
              const data = res.data;
              const clientSecret = data.clientSecret;
              setClientSecret(clientSecret);
            }
          }}
          color="green"
          compact
        >
          PAYMENT
        </Button>
      </Tooltip>
      <Modal
     w={{md:"45%"}}
        styles={(theme) => ({
          body: {
            padding: 0,
          },
          title: {
            fontWeight: 600,
            fontSize: 24,
            color: theme.colors.secondary[8],
          },
          header: {
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          },
        })}
        title="Payment"
        opened={opened}
        onClose={close}
        {...props}
      >
        {(isLoading || loadingConfig) && (
          <LoadingOverlay
            visible={true}
            w={"100%"}
            loader={<Loader variant="bars" />}
          />
        )}
        {data && clientSecret && (
          <Box px={10} py={20}>
            <Elements
              stripe={loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM")}
              options={{ clientSecret }}
            >
              <CheckoutForm data={bookingDetails} />
            </Elements>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default PaymentModal;
