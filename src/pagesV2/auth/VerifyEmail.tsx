import { Button, Center, Stack, Title } from "@mantine/core";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../store/slices/authApiSlice";
import { handleResponse } from "../../utils/responseHandler";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams() as { token: string };

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await verifyEmail({ token });

    handleResponse(res, {
      onSuccess: () => navigate("/login"),
    });
  };
  if (!token) {
    return <Navigate to={"/"} />;
  }

  return (
    <Center h={"80vh"}>
      <Stack>
        <Title>Verify Your Email Address</Title>
        <Button
          onClick={handleSubmit}
          loading={isLoading}
          fullWidth
          size="lg"
          type="button"
          radius={"xl"}
          fw={600}
        >
          Click Here
        </Button>
      </Stack>
    </Center>
  );
};

export default VerifyEmail;
