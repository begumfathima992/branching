import {
  BoxProps,
  ButtonProps,
  CSSObject,
  DrawerProps,
  FileInputProps,
  MantineThemeOverride,
  MenuProps,
  ModalProps,
  MultiSelectProps,
  MultiSelectStylesNames,
  NumberInputProps,
  NumberInputStylesNames,
  PasswordInputProps,
  PasswordInputStylesNames,
  ScrollArea,
  SelectProps,
  SelectStylesNames,
  StackProps,
  TextInputProps,
  TextInputStylesNames,
  TooltipProps,
} from "@mantine/core";
import { DateInputProps, DateInputStylesNames } from "@mantine/dates";
import { HiOutlineChevronDown } from "react-icons/hi";

type GetStylesType<T extends string> = Partial<Record<T, CSSObject>>;

export const componentThemeOverride: MantineThemeOverride["components"] = {
  Select: {
    defaultProps: {
      withinPortal: true,
      size: "md",
      searchable: true,
      hoverOnSearchChange: true,
      rightSection: <HiOutlineChevronDown />,
      styles: (theme, params, context) => ({
        rightSection: {
          color: theme.colors.gray[6],
        },
      }),
    } as SelectProps,
    styles: () =>
      ({
        input: {
          background: "transparent",
        },
        label: {
          fontSize: 14,
        },
      } as GetStylesType<SelectStylesNames>),
  },
  Tooltip: {
    defaultProps: {
      withinPortal: true,
      withArrow: true,
    } as TooltipProps,
  },
  MultiSelect: {
    defaultProps: {
      withinPortal: true,
      searchable: true,
      size: "md",
      hoverOnSearchChange: true,
      rightSection: <HiOutlineChevronDown />,
    } as MultiSelectProps,
    styles: () =>
      ({
        input: {
          background: "transparent",
        },
        label: {
          fontSize: 14,
        },
      } as GetStylesType<MultiSelectStylesNames>),
  },
  TextInput: {
    defaultProps: {
      size: "md",
    } as TextInputProps,
    styles: () =>
      ({
        input: {
          background: "transparent",
        },
        label: {
          fontSize: 14,
        },
      } as GetStylesType<TextInputStylesNames>),
  },
  PasswordInput: {
    defaultProps: {
      size: "md",
    } as PasswordInputProps,
    styles: () =>
      ({
        input: {
          background: "transparent",
        },
        label: {
          fontSize: 14,
        },
      } as GetStylesType<PasswordInputStylesNames>),
  },
  DateInput: {
    defaultProps: {
      size: "md",
      bg: "transparent",
      popoverProps: { withinPortal: true },
    } as DateInputProps,
    styles: () =>
      ({
        input: {
          background: "transparent",
        },
        label: {
          fontSize: 14,
        },
      } as GetStylesType<DateInputStylesNames>),
  },
  NumberInput: {
    defaultProps: {
      size: "md",
      hideControls: true,
      min: 0,
    } as NumberInputProps,
    styles: () =>
      ({
        input: {
          background: "transparent",
        },
        label: {
          fontSize: 14,
        },
      } as GetStylesType<NumberInputStylesNames>),
  },
  Button: {
    defaultProps: {
      fw: 400,
      loaderPosition: "center",
      loaderProps: {
        variant: "dots",
        size: "lg",
      },
    } as ButtonProps,
  },
  Stack: {
    defaultProps: {
      align: "stretch",
    } as StackProps,
  },
  Box: {
    defaultProps: {
      ta: "left",
    } as BoxProps,
  },
  Menu: {
    defaultProps: {
      withArrow: true,
      withinPortal: true,
    } as MenuProps,
  },
  Modal: {
    defaultProps: {
      centered: true,
      scrollAreaComponent: ScrollArea.Autosize,
      shadow: "md",
      overlayProps: {
        opacity: 0.5,
        blur: 5,
      },
    } as Partial<ModalProps>,
  },
  Textarea: {
    styles: {
      input: {
        background: "transparent",
      },
      label: {
        fontSize: 14,
      },
    } as GetStylesType<TextInputStylesNames>,
  },
  Drawer: {
    defaultProps: {
      overlayProps: {
        opacity: 0.5,
        blur: 4,
      },
      withinPortal: true,
    } as DrawerProps,
  },
  FileInput: {
    defaultProps: {
      size: "md",
    } as FileInputProps,
  },
};
