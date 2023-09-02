import { SnackbarProvider } from "notistack";
import React from "react";

export const CustomisedSnackbar = ({ children }: { children: JSX.Element }) => {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      style={{ fontFamily: "sans-serif" }}
    >
      {children}
    </SnackbarProvider>
  );
};
