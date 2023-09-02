import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#04BFFA",
      contrastText: "#fff",
      dark: "#0393c0",
    },
    secondary: {
      main: "#393535b9",
      dark: "#fff",
    },
    info: {
      main: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "16px",
    },
    fontFamily: "sans-serif",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#04BFFA",
          color: "#fff",
          fontSize: 12,
        },
      },
    },
  },
});

export default theme;
