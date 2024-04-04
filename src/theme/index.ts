import {
  DefaultMantineColor,
  MantineThemeOverride,
  Tuple,
} from "@mantine/core";

import { componentThemeOverride } from "./components";

type ExtendedCustomColors =
  | "brand"
  | "secondary"
  | "tertiary"
  | DefaultMantineColor;
type Fonts = "primary" | "secondary";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
  export interface MantineThemeOther {
    fonts: Record<Fonts, string>;
  }
}
export const theme: MantineThemeOverride = {
  colors: {
    brand: [
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
      "#08008C",
    ],
    secondary: [
      "#212121",
      "#212121",
      "#212121",
      "#212121",
      "#212121",
      "#212121",
      "#212121",
      "#212121",
      "#212121",
      "#212121",
    ],
    tertiary: [
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
      "#EAB720",
    ],
  },
  fontFamily: "Roboto, sans-serif",
  primaryColor: "brand",
  components: componentThemeOverride,
  other: {
    fonts: {
      primary: "Roboto, sans-serif",
      secondary: "Merriweather, sans-serif",
    },
  },
  globalStyles: () => ({
    ".mantine-1kettts ": {
      overflow: "visible !important",
    },
    body: {
      overflowX: "hidden",
    },
    "::placeholder": {
      fontSize: 13,
    },
  }),
};
