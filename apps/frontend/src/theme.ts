import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    primary: "#38e07b",
    background: {
      light: "#f6f8f7",
      dark: "#122017",
      sidebar: "#122118",
      card: "#122118",
      cardHover: "#1b3124",
      input: "#264532",
    },
    text: {
      primary: "#ffffff",
      secondary: "#96c5a9",
      dark: "#333333",
    },
    border: {
      primary: "#366348",
      secondary: "#264532",
    },
  },
  fonts: {
    primary: "'Spline Sans', sans-serif",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
};

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      background: {
        light: string;
        dark: string;
        sidebar: string;
        card: string;
        cardHover: string;
        input: string;
      };
      text: {
        primary: string;
        secondary: string;
        dark: string;
      };
      border: {
        primary: string;
        secondary: string;
      };
    };
    fonts: {
      primary: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
