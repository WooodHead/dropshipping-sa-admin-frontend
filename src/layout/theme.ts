import { createTheme } from "@material-ui/core/styles"
import red from "@material-ui/core/colors/red"

export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Cairo",
  },
  palette: {
    primary: red,
    secondary: red,
    error: red,
    background: {
      default: "#fcfcfe",
    },
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
        border: "1px solid #e0e0e3",
        backgroundClip: "padding-box",
      },
    },
    MuiButton: {
      contained: {
        boxShadow: "none",
      },
    },
    MuiButtonBase: {
      root: {
        "&:hover:active::after": {
          content: '""',
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "currentColor",
          opacity: 0.3,
          borderRadius: "inherit",
        },
      },
    },
    MuiAppBar: {
      root: {
        border: "none",
        borderBottom: "1px solid #e0e0e3",
        backgroundClip: "padding-box",
      },
      // colorSecondary: {
      //   color: "#808080",
      //   backgroundColor: "#fff",
      // },
    },
    // MuiLinearProgress: {
    //   colorPrimary: {
    //     backgroundColor: "#f5f5f5",
    //   },
    //   barColorPrimary: {
    //     backgroundColor: "#d7d7d7",
    //   },
    // },
    MuiFilledInput: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        "&$disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        border: "none",
      },
    },
  },
})
