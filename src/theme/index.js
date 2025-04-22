// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { components } from "./components";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "brand.background.primary",
        color: "brand.text.primary",
      },
    },
  },
  colors,
  components,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
});

export default theme;
