import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingOverlayProps {
  open: boolean;
  handleClose: () => void;
}
export function LoadingOverlay(props: LoadingOverlayProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
      onClick={props.handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
