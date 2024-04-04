import { Badge, BadgeProps } from "@mantine/core";

type IBadgeProps = { text: string } & Partial<BadgeProps>;

const Badges = {
  Warning: ({ text, ...props }: IBadgeProps) => (
    <Badge
      radius={5}
      color="yellow"
      variant="light"
      sx={(theme) => ({
        border: `1px solid ${theme.colors.yellow[7]}`,
      })}
      {...props}
    >
      {text}
    </Badge>
  ),
  Danger: ({ text, ...props }: IBadgeProps) => (
    <Badge
      radius={5}
      color="red"
      variant="light"
      sx={(theme) => ({
        border: `1px solid ${theme.colors.red[7]}`,
      })}
      {...props}
    >
      {text}
    </Badge>
  ),
  Success: ({ text, ...props }: IBadgeProps) => (
    <Badge
      radius={5}
      color="green"
      variant="light"
      sx={(theme) => ({
        border: `1px solid ${theme.colors.green[7]}`,
      })}
      {...props}
    >
      {text}
    </Badge>
  ),
  Default: ({ text, ...props }: IBadgeProps) => (
    <Badge
      variant="light"
      color="gray.4"
      c={"dark"}
      radius={0}
      fw={300}
      sx={(theme) => ({
        border: `1px solid ${theme.colors.gray[2]}`,
      })}
      {...props}
    >
      {text}
    </Badge>
  ),
};

export default Badges;
