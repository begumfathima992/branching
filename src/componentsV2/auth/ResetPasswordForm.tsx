import {
  Stack,
  PasswordInput,
  List,
  Button,
  Text,
  StackProps,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../store/slices/authApiSlice";
import { useForm } from "@mantine/form";
import { validateField } from "../../utils/validateField";
import { passwordFormat } from "../../constants/data";
import { handleResponse } from "../../utils/responseHandler";

export const ResetPasswordForm = ({
  token,
  href = "/login",
  withTitle = true,
  ...props
}: {
  token: string;
  href?: string;
  withTitle?: boolean;
} & Partial<StackProps>) => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm({
    initialValues: {
      password: ``,
      confirm_password: ``,
    },
    validate: {
      password: (value) =>
        validateField({
          value,
          reg: passwordFormat,
          message:
            "password must be 8 to 15 characters long with special character and a number",
        }),
      confirm_password: (value, values) =>
        validateField({
          value,
          reg: passwordFormat,
          compareWith: values.password,
          message: "Passwords don't match",
        }),
    },
  });

  const handleSubmit = async () => {
    const res = await resetPassword({
      token,
      password: form.values.password,
      confirm_password: form.values.confirm_password,
    });
    handleResponse(res, {
      onSuccess: () => href && navigate(href),
    });
  };
  return (
    <Stack {...props}>
      {withTitle && (
        <Text fz={28} fw={600} c={`secondary`}>
          Reset your password
        </Text>
      )}
      <Text c={`secondary`} fz={14}>
        We received a request that you want to update your password. You can do
        this by selecting the button below. You&apos;ll be asked to verify your
        identity, and then you can update your password
      </Text>
      <Text c={`secondary`} fz={14}>
        This request expires in 10 minutes.
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          my={10}
          placeholder="New Password Here*"
          {...form.getInputProps(`password`)}
          label={`New Password`}
        />
        <PasswordInput
          my={10}
          placeholder="Confirm Password Here*"
          {...form.getInputProps(`confirm_password`)}
          label={`Confirm Password`}
        />
        <Stack spacing={5} mt={15}>
          <Text fz={18} fw={600}>
            Password must contain
          </Text>
          <List
            spacing={7}
            styles={(theme) => ({
              item: {
                fontSize: 14,
                color: theme.colors.secondary[0],
              },
            })}
            listStyleType="circle"
          >
            <List.Item>1 or more numbers (0-9)</List.Item>
            <List.Item>8 or more letters (a-z, A-Z)</List.Item>
            <List.Item>1 or more special characters</List.Item>
          </List>
        </Stack>
        <Button
          type="submit"
          loading={isLoading}
          bg={`#319F43`}
          size="md"
          display={`block`}
          mx={`auto`}
        >
          UPDATE
        </Button>
      </form>
    </Stack>
  );
};
