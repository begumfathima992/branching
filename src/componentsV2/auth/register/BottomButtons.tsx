import { Button, ButtonProps, Group, GroupProps } from "@mantine/core";

const BottomButtons = ({
  goBack,
  handleSubmit,
  isLoading,
  type = "button",
  btnText,
  ...props
}: {
  goBack: () => void;
  isLoading?: boolean;
  btnText?: string;
  handleSubmit?: () => void;
  type?: ButtonProps["type"];
} & Partial<GroupProps>) => {
  return (
    <Group {...props}>
      <Button
        size="md"
        type="button"
        variant="outline"
        onClick={goBack}
        color="gray.4"
        c={"gray.6"}
        sx={{ flexGrow: 0.5 }}
      >
        Back
      </Button>
      <Button
        size="md"
        sx={{ flexGrow: 0.5 }}
        loading={isLoading}
        type={type}
        onClick={handleSubmit && handleSubmit}
      >
        {!isLoading && (btnText || " Continue")}
      </Button>
    </Group>
  );
};

export default BottomButtons;
