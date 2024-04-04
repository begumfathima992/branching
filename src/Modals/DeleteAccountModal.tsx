import {
  Button,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  Radio,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { Modal, Stack, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BiTrash } from "react-icons/bi";
import { useAppSelector } from "../store/hooks";
import { useDeleteAccountMutation } from "../store/slices/authApiSlice";
import { UseFormReturnType, useForm } from "@mantine/form";
import { handleResponse } from "../utils/responseHandler";
import { useNavigate } from "react-router";

export const DeleteAccountModal = () => {
  const navigate = useNavigate();
  const [opened, { close, open }] = useDisclosure(false);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const { userDetails } = useAppSelector((state) => state.auth);
  const reasonsList = [
    `I'm giving up my activity as an ${userDetails?.role}`,
    "I no longer wish to use this service",
    "I've never used the service",
    "others",
  ];

  const form = useForm({
    initialValues: {
      additionalReason: "",
      otherReason: "",
      reason: "",
    },
    validate: {
      reason: (value) => !value && "required",
      otherReason: (value, values) =>
        values.reason === "others" && !value && "required",
    },
  });

  const handleDeleteAccount = async () => {
    const res = await deleteAccount({
      additonal: form.values.additionalReason,
      reason:
        form.values.reason !== "others"
          ? form.values.reason
          : form.values.otherReason,
    });
    handleResponse(res, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <>
      <ThemeIcon
        onClick={open}
        radius={"xl"}
        bg={"gray.2"}
        c="gray.6"
        size={"lg"}
        sx={(theme) => ({
          cursor: "pointer",
          border: `1px solid ${theme.colors.gray[4]}`,
        })}
      >
        <BiTrash />
      </ThemeIcon>
      <Modal
        size={"lg"}
        title="Delete account?"
        styles={(theme) => ({
          title: {
            color: theme.colors.secondary[0],
            fontSize: 24,
            fontWeight: 600,
          },
          header: {
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          },
        })}
        opened={opened}
        onClose={close}
      >
        <Stack pt={20}>
          <Text c={"gray.6"} fz={14}>
            You are about to permanently delete your account. This will result
            in the deletion of your calendar, lessons, invoices and online
            presence. The cancellation will be effective immediately and you
            will no longer be charged each month.
          </Text>
          <Radio.Group
            {...form.getInputProps("reason")}
            name="reason"
            label="Why are you leaving us?"
            withAsterisk
            styles={(theme) => ({
              label: {
                color: theme.colors.secondary[0],
                fontWeight: 500,
              },
            })}
          >
            <Stack pt={10} spacing={10}>
              {reasonsList.map((val) => (
                <Radio
                  styles={(theme) => ({
                    label: {
                      color: theme.colors.secondary[0],
                    },
                  })}
                  value={val}
                  key={val}
                  label={val}
                />
              ))}
            </Stack>
          </Radio.Group>
          {form.values.reason === "others" && (
            <Textarea
              placeholder="Other Reasons*"
              {...form.getInputProps("otherReason")}
            />
          )}
          <Textarea
            {...form.getInputProps("additionalReason")}
            placeholder="Additional"
          />
          <Confirm
            form={form}
            onConfirm={handleDeleteAccount}
            isLoading={isLoading}
          />
        </Stack>
      </Modal>
    </>
  );
};

const Confirm = ({
  isLoading,
  onConfirm,
  form,
}: {
  onConfirm: () => Promise<void>;
  isLoading: boolean;
  form: UseFormReturnType<{
    additionalReason: string;
    otherReason: string;
    reason: string;
  }>;
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={() => {
          const validate = form.validate();
          if (validate.hasErrors) return;
          open();
        }}
        variant="filled"
        fw={600}
        size="lg"
        color="red.9"
      >
        DELETE MY ACCOUNT
      </Button>
      <Modal
        title="Confirm Action"
        styles={{
          body: {
            padding: "0",
            paddingBottom: 0,
          },
        }}
        withCloseButton={false}
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
      >
        {isLoading && (
          <LoadingOverlay
            visible={true}
            loader={<Loader variant="dots" size={"lg"} />}
          />
        )}
        <Text p={20} fz={14} c={"secondary"}>
          Are you sure you want to delete this account?
        </Text>
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
            onClick={close}
            c={"gray"}
            fw={500}
          >
            Cancel
          </UnstyledButton>
          <Button
            disabled={isLoading}
            sx={{
              ":hover": {
                background: "transparent",
              },
            }}
            bg={"transparent"}
            c={"red.8"}
            fw={500}
            onClick={() => {
              onConfirm();
              close();
            }}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};
