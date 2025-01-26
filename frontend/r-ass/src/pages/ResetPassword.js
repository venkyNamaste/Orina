import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(5); // Timer for redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSubmit = async () => {
    const { newPassword, confirmPassword } = passwordForm;

    if (!newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`, {
        newPassword,
        token,
      })
      setSuccessMessage("Password reset successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  };

  // Countdown Timer for Redirect
  useEffect(() => {
    if (successMessage) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        navigate("/auth");
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [successMessage, navigate]);

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
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, color: "#00796B" }}
        >
          🔑 Reset Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Enter your new password below.
        </Typography>

        {/* Success and Error Messages */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
            <Typography variant="body2" sx={{ mt: 1 }}>
              Redirecting to login in {countdown} seconds...
            </Typography>
          </Alert>
        )}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {/* Password Fields */}
        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          type="password"
          value={passwordForm.newPassword}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={passwordForm.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#00796B",
            "&:hover": { backgroundColor: "#005A4A" },
            mt: 2,
          }}
          disabled={successMessage} // Disable button after success
        >
          Reset Password
        </Button>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
