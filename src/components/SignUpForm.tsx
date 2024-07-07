import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login, signup } from "../api/auth";
import useNotification from "../hooks/useNotification";
import { LoadingOverlay } from "./LoadingOverlay";

const SignupForm: React.FC = () => {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification, Notification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signup(username, password);
      setIsLoading(false);
      localStorage.setItem("TOKEN", response.data.token);
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      showNotification(error.response.data.message || "Signup failed", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await login(username, password);
      setIsLoading(false);
      localStorage.setItem("TOKEN", response.data.token);
      window.location.href = "/";
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      showNotification(error.response.data.message || "Signup failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    switch (formType) {
      case "signUp":
        await handleSignup(e);
        break;
      case "login":
        await handleLogin(e);
        break;
      default:
        break;
    }
  };

  return (
    <q>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "white",
            p: 3,
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          {formType === "signUp" && (
            <>
              <Typography variant="h6" align="center" gutterBottom>
                Sign Up
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                color="secondary"
                onClick={() => setFormType("login")}
              >
                Already have an account? Login
              </Button>
            </>
          )}
          {formType === "login" && (
            <>
              <Typography variant="h6" align="center" gutterBottom>
                Login
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Button
                fullWidth
                color="secondary"
                onClick={() => setFormType("signUp")}
              >
                Don't have an account? Sign Up
              </Button>
            </>
          )}
        </Box>
        {Notification}
      </Box>

      <LoadingOverlay
        open={isLoading}
        handleClose={() => setIsLoading(false)}
      />
    </q>
  );
};

export default SignupForm;
