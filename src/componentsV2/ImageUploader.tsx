import { FileInput, ThemeIcon } from "@mantine/core";
import { Text } from "@mantine/core";
import { Paper, Stack } from "@mantine/core";
import { IoCloudUpload } from "react-icons/io5";

export const ImageUploader = ({
  label,
  preview,
  setFile,
  setPreview,
}: {
  label: string;
  preview: string | null;
  setFile: (file: string | ArrayBuffer | null) => void;
  setPreview: (e: string | null) => void;
}) => {
  const handleImageUpload = (img: File | null) => {
    const reader = new FileReader();
    let imgUrl;
    if (img) {
      imgUrl = URL.createObjectURL(img);
      setPreview(imgUrl);
    }
    const file = img && img;
    reader.onload = () => setFile(reader.result);
    reader.readAsDataURL(file as File);
  };

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
            background: preview ? "rgb(0 0 0 /20%)" : "transparent",
            zIndex: 2,
            left: 0,
            top: 0,
          },
        }}
        pos={"relative"}
        withBorder
        radius={5}
        h={120}
      >
        {preview && (
          <img
            src={preview as string}
            alt={label}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        )}
        <ThemeIcon
          pos={"absolute"}
          size={"xl"}
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
          <FileInput
            onChange={handleImageUpload}
            styles={{
              input: {
                border: "none",
                background: "transparent",
                width: "0px",
              },
              icon: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1.5rem",
              },
              wrapper: { position: "relative" },
            }}
            icon={<IoCloudUpload />}
            accept="image/png,image/jpeg"
          />
        </ThemeIcon>
      </Paper>
      <Text fz={12} c={"secondary"} ta={"center"}>
        {label}
      </Text>
    </Stack>
  );
};
