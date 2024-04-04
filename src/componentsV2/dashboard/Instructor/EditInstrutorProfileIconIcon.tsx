import { ThemeIcon, ThemeIconProps, Tooltip } from "@mantine/core";
import { MdEdit } from "react-icons/md";

export const EditInstrutorProfileIconIcon = (
  props: Partial<ThemeIconProps>
) => {
  return (
    <Tooltip label="Edit">
      <ThemeIcon
        radius={"xl"}
        bg={"gray.2"}
        c="gray.6"
        size={"lg"}
        sx={(theme) => ({
          cursor: "pointer",
          border: `1px solid ${theme.colors.gray[4]}`,
        })}
        {...props}
      >
        <MdEdit />
      </ThemeIcon>
    </Tooltip>
  );
};
