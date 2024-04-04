import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { PaymentErrorModal } from "../../Modals/PaymentErrorModal";
import { useCompletePaymentMutation } from "../../store/slices/authApiSlice";
import { IBookings } from "../../types/IBooking";

export const CheckoutForm = ({ data }: { data: IBookings }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentComplete] = useCompletePaymentMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const [stripePayment, bookingComplete] = await Promise.all([
        stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/dashboard?price=${
              data.instructor_price_per_hour * 2
            }&time=${data.time}&date=${data.date}&name=${data.instructor_name}`,
          },
        }),
        paymentComplete({ booking_id: data.booking_id }),
      ]);

      const { error } = stripePayment;

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unexpected error occured.");
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setIsProcessing(false);
  };

  const options: StripePaymentElementOptions = {
    layout: {
      type: "tabs",
      defaultCollapsed: false,
    },
  };

  return (
    <>
      {errorMessage && (
        <PaymentErrorModal onClick={handleSubmit} loading={isProcessing} />
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={options} />
        <Stack spacing={10} py={10}>
          <Divider />
          
          <Group c={"secondary"} position="apart" noWrap px={10}>
            <Text fw={600} fz={14}>
              Instructor price per hour:{" "}
            </Text>
            <Text fz={15}>
              {!data.instructor_price_per_hour
                ? "loading..."
                : "$" + data.instructor_price_per_hour}
            </Text>
          </Group>
          <Group position="apart" c={"secondary"} noWrap px={10}>
            <Text fw={600} fz={14}>
              Booking price of 2 hours:{" "}
            </Text>
            <Text fz={15}>
              {!data.instructor_price
                ? "loading..."
                : "$" + data.instructor_price}
            </Text>
          </Group>
          <Group c={"secondary"} position="apart" noWrap px={10}>
            <Text fw={600} fz={22}>
              Total Fares:{" "}
              {/* <Text component="sup" fw={400} fz={16}>
                ${data.instructor_price_per_hour} * 2
              </Text> */}
            </Text>
            <Text fz={18}>
              {!data.instructor_price_per_hour
                ? "loading..."
                : "$" + data.instructor_price_per_hour * 2}
            </Text>
          </Group>
          <Divider />
          <Box px={10}>
            <Button
              size="md"
              type="submit"
              fullWidth
              loading={isProcessing}
              disabled={isProcessing || !stripe || !elements}
            >
              {isProcessing ? "processing.." : "PAY"}
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};
