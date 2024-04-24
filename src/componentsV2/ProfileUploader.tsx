import {
  Avatar,
  FileInput,
  Group,
  GroupProps,
  Text,
  Tooltip,
} from "@mantine/core";
import { BsPlus } from "react-icons/bs";
import { PiFileArrowUp } from "react-icons/pi";

export const ProfileUpload = ({
  handleImageUpload,
  preview,
  error,
  iconColor,
  ...props
}: {
  preview: string | null;
  error?: string | null;
  iconColor?: string;
  handleImageUpload: (img: File | null) => void;
} & Partial<GroupProps>) => {
  return (
    <Group mantine-1jggmkl mt={25} {...props}>
      <Avatar.Group pos={"relative"}>
        <Avatar
          styles={(theme) => ({
            root: {
              outline: `1px dashed ${theme.colors.gray[4]}`,
              padding: 3,
            },
          })}
          size={"lg"}
          radius={"xl"}
          src={preview && preview}
        >
          <PiFileArrowUp size={"2rem"} />
        </Avatar>
        <Tooltip label={"upload profile image"}>
          <Avatar
            size={"sm"}
            pos={"absolute"}
            bottom={-5}
            sx={(theme) => ({
              boxShadow: theme.shadows.lg,
              zIndex: 2,
              transform: "translateX(110%)",
            })}
            radius={"50%"}
          >
            <FileInput
              accept="image/png,image/jpeg"
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
                  color : iconColor
                },
                wrapper: { position: "relative" },
              }}
              icon={<BsPlus />}
              onChange={handleImageUpload}
            />
          </Avatar>
        </Tooltip>
      </Avatar.Group>
      {error && (
        <Text fz={14} c={"red.8"}>
          {error}
        </Text>
      )}
    </Group>
  );
};

