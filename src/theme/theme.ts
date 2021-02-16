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
      main: "#fff",
      dark: "#fff",
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
  },
});

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    bg: Palette["primary"];
  }
  interface PaletteOptions {
    bg: PaletteOptions["primary"];
  }
}
