import React, { useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useNotification = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showNotification = useCallback((msg: string, sev = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Notification = (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );

  return { showNotification, Notification };
};

export default useNotification;
