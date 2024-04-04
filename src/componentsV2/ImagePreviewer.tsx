import {
  Stack,
  Paper,
  ThemeIcon,
  Center,
  Text,
  PaperProps,
} from "@mantine/core";
import { MdVisibility } from "react-icons/md";

export const ImagePriviewer = ({
  label,
  imgsrc,
  alt,
  ...props
}: {
  label?: string;
  imgsrc: string | null;
  alt: string;
} & PaperProps) => {
  return (
    <Stack spacing={10}>
      <Paper
        sx={{
          overflow: "hidden",
          ":after": {
            content: "''",
            position: "absolute",
            height: "100%",
            width: "100%",
            background: imgsrc ? "rgb(0 0 0 /20%)" : "transparent",
            zIndex: 2,
            left: 0,
            top: 0,
          },
        }}
        pos={"relative"}
        withBorder
        radius={5}
        h={120}
        {...props}
      >
        {imgsrc ? (
          <>
            <img
              src={imgsrc}
              alt={alt}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <ThemeIcon
              pos={"absolute"}
              sx={(theme) => ({
                zIndex: 9,
                transform: "translate(-50%, -50%)",
                border: `1px solid ${theme.colors.gray[4]}`,
                cursor: "pointer",
              })}
              bg={"gray.2"}
              c="gray.7"
              top={"50%"}
              radius={"xl"}
              left={"50%"}
            >
              <MdVisibility />
            </ThemeIcon>
          </>
        ) : (
          <Center px={10} c="red.8" h={"100%"} ta={"center"} fz={13}>
            no preview available
          </Center>
        )}
      </Paper>
      {label && (
        <Text fz={12} c={"secondary"} ta={"center"}>
          {label}
        </Text>
      )}
    </Stack>
  );
};
