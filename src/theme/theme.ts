import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#115293",
      light: "#4791db",
      contrastText: "#fff",
    },
    secondary: {
      main: "#33ffee",
    },
    text: {
      primary: "#fff",
    },
    bg: {
      main: "#2A3458",
      light: "#2C70F5",
      dark: "#202636",
      contrastText: "#fff",
    },
    userColor: {
      main: "#448aff",
    },
    membersColor: {
      main: "#8e24aa",
    },
    modColor: {
      main: "#00b8d4",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    bg: Palette["primary"];
    userColor: Palette["primary"];
    membersColor: Palette["primary"];
    modColor: Palette["primary"];
  }
  interface PaletteOptions {
    bg: PaletteOptions["primary"];
    userColor: PaletteOptions["primary"];
    membersColor: PaletteOptions["primary"];
    modColor: PaletteOptions["primary"];
  }
}
