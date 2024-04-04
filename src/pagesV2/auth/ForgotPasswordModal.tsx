import {
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useForgotPasswordMutation } from "../../store/slices/authApiSlice";
import { handleResponse } from "../../utils/responseHandler";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [opened, { close, open }] = useDisclosure(false);

  const { getInputProps, values } = useForm({
    initialValues: {
      email: "",
    },
  });

  const handleSubmit = async () => {
    const res = await forgotPassword(values);
    handleResponse(res, {
      onSuccess: () => close(),
    });
  };

  return (
    <>
      <UnstyledButton c={"brand"} fw={600} onClick={open}>
        Forgot Password?
      </UnstyledButton>
      <Modal
        withCloseButton={false}
        closeOnClickOutside={false}
        shadow="md"
        opened={opened}
        onClose={close}
      >
        <Title c={"secondary"}>Forgot password ?</Title>
        <Text fz={14} c={"gray.7"}>
          Enter the email address you used to create your
          <Text component="span" fw={600} c={"secondary"}>
            {" "}
            Drivetestpros{" "}
          </Text>
          account. We&apos;ll send a password reset email.
        </Text>
        <form>
          <Stack pt={20}>
            <TextInput
              {...getInputProps("email")}
              type="email"
              placeholder="Email*"
              required
              autoFocus
            />
            <Button
              onClick={handleSubmit}
              type="button"
              loading={isLoading}
              fullWidth
              size="md"
            >
              SEND RESET EMAIL
            </Button>
            <UnstyledButton
              onClick={close}
              c="gray.6"
              w={"100%"}
              ta={"center"}
              mt={10}
              type="button"
            >
              Back to Login
            </UnstyledButton>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default ForgotPassword;
