import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          tailwebs.
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("TOKEN");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
