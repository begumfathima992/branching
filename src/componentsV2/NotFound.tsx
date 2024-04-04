import { Center, CenterProps, Stack, Text } from "@mantine/core";
import EmptyBox from "../svg/EmptyBox";

export const NotFound = ({
  title,
  caption,
  iconSize,
  ...props
}: {
  title?: string;
  caption?: string;
  iconSize?: number;
} & Partial<CenterProps>) => {
  return (
    <Center h={"100vh"} {...props}>
      <Stack align="center" spacing={5}>
        <EmptyBox height={iconSize} width={iconSize} />
        <Text fw={600} mt={5}>
          {title || "Looks like you don't find any instructor yet."}
        </Text>
        {caption && (
          <Text fz={14} c={"gray.7"}>
            {caption}
          </Text>
        )}
      </Stack>
    </Center>
  );
};
