import { Grid, Group } from "@mantine/core";
import Badges from "../../Badges";

export const DetailsLayout = ({
  label,
  content,
}: {
  label: string;
  content: string | number | string[] | null | undefined;
}) => {
  return (
    <Grid fw={500}>
      <Grid.Col span={4} fz={14} c={"secondary"}>
        {label}
      </Grid.Col>
      <Grid.Col c={"gray.6"} fz={14} span={8}>
        {(typeof content === "string" || typeof content === "number") &&
          content}
        {Array.isArray(content) && (
          <Group spacing={10}>
            {content.map((d, i) => (
              <Badges.Default key={d+i} text={d} />
            ))}
          </Group>
        )}
      </Grid.Col>
    </Grid>
  );
};
