import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 20px",
        },
        containedPrimary: {
          background: "linear-gradient(to right, #3b82f6, #6366f1)",
          color: "#fff",
          '&:hover': {
            background: "linear-gradient(to right, #2563eb, #4f46e5)",
          },
        },
        outlined: {
          borderColor: "#d1d5db",
          color: "#374151",
          '&:hover': {
            backgroundColor: "#f9fafb",
            borderColor: "#9ca3af",
          },
        },
        text: {
          color: "#4b5563",
          '&:hover': {
            backgroundColor: "#f3f4f6",
          },
        },
      },
    },
  },
});

export default theme;
