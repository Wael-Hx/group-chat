import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#26c6da",
    },
    bg: {
      main: "#fefefe",
      light: "#fafafa",
      dark: "#f5f5f5",
    },
    bgSecondary: {
      main: "#BFBDC1",
    },
    text: {
      primary: "#121212",
    },
    userColor: {
      main: "#3f51b5",
    },
    membersColor: {
      main: "#673ab7",
    },
    modColor: {
      main: "#004d40",
    },
    contrastThreshold: 3,
    tonalOffset: 0.3,
  },
  typography: {
    h3: {
      fontFamily: "Montserrat , Roboto,helvetica",
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: "Montserrat , Roboto,helvetica",
      fontSize: "1.4rem",
    },
    h5: {
      fontFamily: "Raleway , Roboto , helvetica",
      fontSize: "1.2rem",
    },
    h6: {
      fontFamily: "Raleway , Roboto,helvetica",
      fontSize: "0.87rem",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "Roboto , sans-serif",
      fontSize: "0.8rem",
    },
    subtitle1: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "0.6rem",
      fontWeight: "lighter",
    },
    subtitle2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "0.75rem",
      fontWeight: "normal",
    },
    htmlFontSize: 16,
  },
});

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    bg: Palette["primary"];
    bgSecondary: Palette["primary"];
    userColor: Palette["primary"];
    membersColor: Palette["primary"];
    modColor: Palette["primary"];
  }
  interface PaletteOptions {
    bg: PaletteOptions["primary"];
    bgSecondary: PaletteOptions["primary"];
    userColor: PaletteOptions["primary"];
    membersColor: PaletteOptions["primary"];
    modColor: PaletteOptions["primary"];
  }
}
