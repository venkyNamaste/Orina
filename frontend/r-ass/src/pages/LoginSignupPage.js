import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Grid,
  Link,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginSignupPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({ email: "", password: "", name: "" }); // Reset form when switching tabs
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (tabValue === 1 && !formData.name) {
      newErrors.name = "Name is required for signup.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true); // Start loading
      try {
        if (tabValue === 0) {
          // Login API
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
            email: formData.email,
            password: formData.password,
          });
          localStorage.setItem("token", response.data.token);
          toast.success("Login Successful!");
          window.location.href = "/dashboard"; // Redirect
        } else {
          // Signup API
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          toast.success("Signup Successful!");
          localStorage.setItem("token", response.data.token); // Save token
          window.location.href = "/dashboard"; // Redirect
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom, rgba(237, 233, 254, 1), rgba(255, 255, 255, 1))",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          width: "450px",
          padding: "30px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
        onKeyDown={handleKeyDown} // Handle Enter key press
        tabIndex="0" // Make the box focusable for key events
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#4C1D95",
            marginBottom: "20px",
          }}
        >
         Smart Hiring Starts Here
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        {/* Login Tab */}
        {tabValue === 0 && (
          <Box mt={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle visibility
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={togglePasswordVisibility}
                    style={{ color: "#6B7280" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                ),
              }}
            />

            {/* Forget Password Link */}
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Link
                href="/forget-password"
                underline="hover"
                sx={{ color: "#4C1D95", fontSize: "14px" }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#4C1D95",
                color: "white",
                fontWeight: "bold",
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "30px",
                transition: "all 0.3s",
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        )}

        {/* Signup Tab */}
        {tabValue === 1 && (
          <Box mt={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              margin="normal"
            />

            <Button fullWidth variant="contained" style={{
                backgroundColor: "#4C1D95",
                color: "white",
                fontWeight: "bold",
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "30px",
                transition: "all 0.3s",
              }} onClick={handleSubmit} >
              {isLoading ? "Signing up..." : "Signup"}
            </Button>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default LoginSignupPage;
