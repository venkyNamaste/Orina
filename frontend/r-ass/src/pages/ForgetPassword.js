import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/forget-password`, { email });
      setSuccessMessage("A reset password link has been sent to your email.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to send reset link.");
      setSuccessMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#F9FAFB",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "90%",
          maxWidth: "400px",
          borderRadius: "8px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#00796B" }}>
          🔑 Forget Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Enter your registered email address, and we'll send you a reset link.
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          fullWidth
          label="Email Address"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#00796B",
            "&:hover": { backgroundColor: "#005A4A" },
            mt: 2,
          }}
        >
          Send Reset Link
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgetPassword;
