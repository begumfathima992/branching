import { Stack, Group, Button, Text, StackProps } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { TfiCloudUp } from "react-icons/tfi";
import { toast } from "react-toastify";

export const FileDropZone = ({
  title,
  setImage,
  label,
  errroMessage,
  ...props
}: {
  title?: string;
  label?: string;
  errroMessage?: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
} & Partial<StackProps>) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const handleImageUpload = (image: FileWithPath[]) => {
    if (image) {
      setPreview(image[0].path);
    }
    const file = image[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack {...props}>
      {title && (
        <Text fw={500} fz={18} ta={"left"}>
          {title}
        </Text>
      )}
      <Dropzone
        sx={(theme) => ({ borderColor: errroMessage ? theme.colors.red[8] : theme.colors.gray[4] })}
        onDrop={handleImageUpload}
        onReject={(files) =>
          toast.error("Something went wrong!!, please try again")
        }
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group position="center" c="gray.5" pb={20}>
          <TfiCloudUp size={"2rem"} />
          <Text c={errroMessage ? "red.8" : "dark"}>
            {errroMessage
              ? errroMessage
              : label
              ? label
              : "Drag and drop or Click to upload"}
          </Text>
        </Group>
        <Button
          tt={"capitalize"}
          variant="outline"
          styles={(theme) => ({
            leftIcon: {
              fontSize: "1.25rem",
            },
          })}
          leftIcon={<AiOutlineUpload />}
          fw={600}
          mx={"auto"}
          display={"block"}
        >
          {preview
            ? preview.length > 12
              ? preview.substring(0, 9) + "..."
              : preview
            : "upload files"}
        </Button>
      </Dropzone>
    </Stack>
  );
};
