// src/theme/components.js
export const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
      borderRadius: "md",
    },
    variants: {
      solid: {
        bg: "brand.primary",
        color: "white",
        _hover: {
          bg: "brand.primary",
          opacity: 0.9,
        },
      },
      outline: {
        borderColor: "brand.primary",
        color: "brand.primary",
        _hover: {
          bg: "rgba(0, 150, 255, 0.1)",
        },
      },
      ghost: {
        color: "brand.text.primary",
        _hover: {
          bg: "brand.background.tertiary",
          color: "brand.text.primary",
        },
      },
      wait: {
        bg: "brand.secondary",
        color: "white",
        _hover: {
          bg: "brand.secondary",
          opacity: 0.9,
        },
      },
      go: {
        bg: "brand.success",
        color: "white",
        _hover: {
          bg: "brand.success",
          opacity: 0.9,
        },
      },
    },
  },
  Card: {
    baseStyle: {
      bg: "brand.background.secondary",
      borderRadius: "md",
      overflow: "hidden",
    },
  },
  Tabs: {
    baseStyle: {
      tab: {
        _selected: {
          color: "brand.text.primary",
          borderColor: "brand.primary",
        },
        _hover: {
          color: "brand.text.primary",
        },
      },
    },
    variants: {
      line: {
        tab: {
          borderBottomWidth: "2px",
          _selected: {
            borderColor: "brand.primary",
          },
        },
      },
    },
  },
  Table: {
    baseStyle: {
      th: {
        textTransform: "none",
        color: "brand.text.secondary",
      },
      td: {
        borderColor: "brand.border.primary",
      },
    },
  },
};
