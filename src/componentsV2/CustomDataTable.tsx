import {
  Box,
  Group,
  Pagination,
  PaginationProps,
  ScrollArea,
  Table,
  Text,
  createStyles,
} from "@mantine/core";
import { dataPurifier } from "../utils/dataPurifier";
import LoaderUi from "./LoaderUi";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";

export type ICustomDatatableProps<T> = {
  columns: Partial<Array<keyof T | "actions">>;
  config?: Partial<
    Record<
      keyof T | "actions",
      {
        header?: React.ReactNode;
        render?: (item: T, index?: number) => React.ReactNode;
      }
    >
  >;
  caption?: React.ReactNode | string;
};

export type CustomDataTableProps<T> = {
  tableProps: ICustomDatatableProps<T>;
  data: T[] | undefined;
  isLoading?: boolean;
  paginationProps?: PaginationProps;
  emptyDataMessage?: string;
};

const useStyles = createStyles<string, { isScrolled: boolean }>(
  (theme, { isScrolled }) => ({
    tr: {
      td: {
        ":last-child": {
          borderLeft: `2px solid ${theme.colors.gray[4]} !important`,
        },
      },
    },
    table: {
      overflow: "auto",
      wordBreak: "keep-all",
      width: "100%",
      thead: {
        transition: "all 1s ease",
        position: "sticky",
        top: 0,
        background: theme.white,
        zIndex: 9,
        boxShadow: isScrolled ? `0px 5px 5px rgb(0 0 0 /10%)` : "none",
        th: {
          borderColor: isScrolled
            ? "transparent !important"
            : theme.colors.gray[4],
        },
      },
    },
  })
);

export function CustomDataTable<T extends Record<string, unknown>>({
  tableProps,
  data,
  isLoading,
  paginationProps,
  emptyDataMessage,
}: CustomDataTableProps<T>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { classes } = useStyles({ isScrolled });
  const { columns, config, caption } = tableProps;
  const { userDetails } = useAppSelector((state) => state.auth);

  const notFoundMessage = emptyDataMessage
    ? emptyDataMessage
    : "It looks like you don't have any upcoming bookings.";

  const rows = isLoading ? (
    <tr>
      <td colSpan={columns.length} rowSpan={5}>
        <LoaderUi h={"45vh"} />
      </td>
    </tr>
  ) : !data || data.length === 0 ? (
    <tr>
      <td colSpan={columns.length} rowSpan={5}>
        <NotFound
          h={"45vh"}
          title={
            userDetails?.role === "INSTRUCTOR"
              ? notFoundMessage
              : "Please select your instructor to start booking classes."
          }
          caption=" "
        />
      </td>
    </tr>
  ) : (
    data.length > 0 &&
    data?.map((row, index) => {
      return (
        <tr
          style={{ padding: "20px 10px" }}
          {...(columns.includes("actions") && {
            className: classes.tr,
          })}
          key={index}
        >
          {columns.map((key) => {
            if (config && config[key]?.render) {
              return (
                <td style={{ wordBreak: "keep-all" }} key={key as string}>
                  {config[key]?.render && config[key]?.render!(row, index)}
                </td>
              );
            } else {
              return (
                <td key={key as string}>
                  {!row[key as string] ? (
                    <Text c="red.8">no data</Text>
                  ) : (
                    <Text
                      sx={{ wordBreak: "keep-all" }}
                      c={"#646464"}
                      fw={500}
                      fz={14}
                    >
                      {row[key as string] as React.ReactNode}
                    </Text>
                  )}
                </td>
              );
            }
          })}
        </tr>
      );
    })
  );
  return (
    <Box>
      {caption && (
        <Text tt={"capitalize"} fz={20} c={"secondary"} fw={600}>
          {caption}
        </Text>
      )}
      <ScrollArea
        type="hover"
        onScrollPositionChange={({ y }) => setIsScrolled(y !== 0)}
        h={"55svh"}
        w="100%"
        miw={"100%"}
        maw={"80vw"}
        mt={caption ? 10 : 0}
        sx={(theme) => ({
          border: `1px solid ${theme.colors.gray[4]}`,
        })}
      >
        <Table w={"100%"} className={classes.table}>
          <thead>
            <tr>
              {columns.map((th) => (
                <th key={th as string} style={{ wordBreak: "keep-all" }}>
                  <Text tt={"capitalize"} fw={500} c={"secondary"} fz={14}>
                    {config && config[th]?.header
                      ? config[th]?.header
                      : (th as string).includes("_")
                      ? (th as string).split("_").at(-1)
                      : dataPurifier(th as string)}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      {paginationProps &&
        (() => {
          const { total, ...props } = paginationProps;
          return (
            data &&
            total > 1 && (
              <Group position="center" pt={20}>
                <Pagination total={total} {...props} />
              </Group>
            )
          );
        })()}
    </Box>
  );
}
export default CustomDataTable;
