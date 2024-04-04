import {
  Alert,
  Box,
  Button,
  Checkbox,
  Group,
  Stack,
  Text
} from "@mantine/core";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import Extra from "../../componentsV2/auth/Extra";
import useCustomForm from "../../hooks/useCustomForm";
import { useAppSelector } from "../../store/hooks";
import { useLoginMutation } from "../../store/slices/authApiSlice";
import { handleResponse } from "../../utils/responseHandler";
import ForgotPassword from "./ForgotPasswordModal";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [emailVerified, setEmailVerified] = useState(true);

  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const verificationMessage = (
    <Alert
      variant="filled"
      styles={(theme) => ({
        icon: {
          color: theme.colors.red,
        },
      })}
      icon={<FiAlertCircle />}
      bg={"red.2"}
      radius={0}
    >
      <Text c={"red"}>
        Email verification link has been sent to your email, please verify
        before login
      </Text>
    </Alert>
  );

  const { render, form } = useCustomForm({
    initialValues: {
      email: "",
      password: "",
    },
    inputfields: {
      email: {
        type: "email",
        placeholder: "Email*",
        required: true,
        name: "email",
        id:"email",
        size: "lg",
      },
      password: {
        type: "password",
        placeholder: "Password*",
        required: true,
        size: "lg",
      },
    },
    btnText: "Login",
    submitBtn: false,
  });

  const handlelogin = async (values: { email: string; password: string }) => {
    const res = await login(values);

    handleResponse(res, {
      successMessage: "Login Successfull",
      onError: (err) => {
        if ("status" in err) {
          const status = err.status;
          if (status === 403) {
            setEmailVerified(false);
            return;
          }
        }
      },
      onSuccess: () => {
        navigate("/dashboard", {
          state: { title: "Dashboard", withBackBtn: false },
        });
      },
    });
  };

  if (token !== null) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Stack align="stretch" ta="start" spacing={40}>
        {!emailVerified && verificationMessage}
        <Box>
          <Text c={"secondary"} fz={28} fw={600}>
            Login
          </Text>
          <Text c={"secondary"} fz={15}>
            Login to your account
          </Text>
        </Box>
        <form onSubmit={form.onSubmit(handlelogin)}>
          {render}
          <Group position="apart" noWrap pt={20}>
            <Checkbox label={"Keep me signed in"} />
            <ForgotPassword />
          </Group>
          <Button loading={isLoading} type="submit" fullWidth mt={20} size="lg">
            {!isLoading && "Login"}
          </Button>
        </form>
        <Box mt={-30}>
          <Extra
            extraText="Don’t have an account?"
            href="/register"
            btnText="Register"
          />
        </Box>
      </Stack>
    </>
  );
};

export default Login;
