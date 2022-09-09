import { blueGrey, blue, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
console.log(blue[700]);
const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
    },
    navbar: {
      main: grey[800],
    },
    header: {
      main: grey[500],
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&:hover:before": {
            borderBottomColor: "rgba(25, 118, 210, .87)!important",
          },
        },
      },
    },
  },
});

export default theme;
