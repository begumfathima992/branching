import { Button, Modal, ModalProps, Stack, Text } from "@mantine/core";
import { EmailVerification } from "../../svg/EmailVerification";
import { useNavigate } from "react-router-dom";

const VerifyEmailPopup = (props: ModalProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      size={`lg`}
      closeOnClickOutside={false}
      withCloseButton={false}
      {...props}
    >
      <Stack align="center">
        <EmailVerification />
        <Text fz={28} fw={500}>
          Email Sent!
        </Text>
        <Text c={`secondary`} ta={`center`}>
          We&apos;ve sent an email to your email address. Follow the steps
          provided in the email to update your password or select Log In if you
          don&apos;t want to change your password at this time
        </Text>
        <Button
          size="md"
          fullWidth
          onClick={() => {
            props.onClose();
            navigate("/login");
          }}
        >
          BACK TO LOGIN
        </Button>
      </Stack>
    </Modal>
  );
};

export default VerifyEmailPopup;
