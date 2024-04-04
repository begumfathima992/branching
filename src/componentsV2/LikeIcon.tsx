import { ThemeIcon, ThemeIconProps, Tooltip } from "@mantine/core";
import { FcLike } from "react-icons/fc";
import { FiHeart } from "react-icons/fi";

export const LikeIcon = (props: Partial<ThemeIconProps>) => {
  return (
    <Tooltip label={<FcLike size={"1.25rem"} />}>
      <ThemeIcon
        radius="xl"
        bg="gray.0"
        c="#E75035"
        sx={(theme) => ({
          cursor: "pointer",
          border: `1px solid ${theme.colors.gray[1]}`,
          ":hover": {
            background: theme.colors.gray[2],
          },
        })}
        {...props}
      >
        <FiHeart />
      </ThemeIcon>
    </Tooltip>
  );
};
