import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  // State for Email Form
  const [emailForm, setEmailForm] = useState({
    currentEmail: "",
    newEmail: "",
    confirmEmail: "",
  });
  const [emailError, setEmailError] = useState("");

  // State for Password Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  // Password visibility state
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Success messages
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSuccessMessage(""); // Reset success messages on tab switch
    setEmailError("");
    setPasswordError("");
  };

  // Handle Input Change
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;

    if (formType === "email") {
      setEmailForm({ ...emailForm, [name]: value });
    } else if (formType === "password") {
      setPasswordForm({ ...passwordForm, [name]: value });
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Validate Email Form
  const validateEmailForm = () => {
    const { currentEmail, newEmail, confirmEmail } = emailForm;

    if (!currentEmail || !newEmail || !confirmEmail) {
      setEmailError("All fields are required.");
      return false;
    }

    if (newEmail !== confirmEmail) {
      setEmailError("New email and confirmation email must match.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    setEmailError("");
    return true;
  };

  // Validate Password Form
  const validatePasswordForm = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation password must match.");
      return false;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  // Update Email
  const handleUpdateEmail = async () => {
    if (!validateEmailForm()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-email`,
        emailForm,
        { headers: { Authorization: token } }
      );
      setSuccessMessage("Email updated successfully!");
    } catch (error) {
      setEmailError(
        error.response?.data?.message || "Failed to update email."
      );
    }
  };

  // Update Password
  const handleUpdatePassword = async () => {
    if (!validatePasswordForm()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-password`,
        passwordForm,
        { headers: { Authorization: token } }
      );
      setSuccessMessage("Password updated successfully!");
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        bgcolor: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: "600px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Header */}
        <Box sx={{ backgroundColor: "#00796B", color: "#fff", p: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            ⚙️ Settings
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ backgroundColor: "#E0F2F1" }}
        >
          <Tab label="Account Settings" icon={<FaEnvelope />} />
          <Tab label="Security Settings" icon={<FaLock />} />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

{activeTab === 0 && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ✉️ Change Email Address
              </Typography>
              {emailError && <Alert severity="error">{emailError}</Alert>}
              <TextField
                fullWidth
                label="Current Email"
                name="currentEmail"
                value={emailForm.currentEmail}
                onChange={(e) => handleInputChange(e, "email")}
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Email"
                name="newEmail"
                value={emailForm.newEmail}
                onChange={(e) => handleInputChange(e, "email")}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm New Email"
                name="confirmEmail"
                value={emailForm.confirmEmail}
                onChange={(e) => handleInputChange(e, "email")}
                margin="normal"
              />
              <Button variant="contained"  sx={{
                    backgroundColor: "#00796B",
                    "&:hover": { backgroundColor: "#005A4A" },
                    mt: 2,
                  }} onClick={handleUpdateEmail}>
                Update Email
              </Button>
            </>
          )}



          {activeTab === 1 && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔑 Change Password
              </Typography>
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={
                      field === "currentPassword"
                        ? "Current Password"
                        : field === "newPassword"
                        ? "New Password"
                        : "Confirm Password"
                    }
                    name={field}
                    type={showPassword[field] ? "text" : "password"}
                    value={passwordForm[field]}
                    onChange={(e) => handleInputChange(e, "password")}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility(field)}
                          >
                            {showPassword[field] ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              )}
              <Button variant="contained" sx={{
                    backgroundColor: "#00796B",
                    "&:hover": { backgroundColor: "#005A4A" },
                    mt: 2,
                  }} onClick={handleUpdatePassword}>
                Update Password
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
