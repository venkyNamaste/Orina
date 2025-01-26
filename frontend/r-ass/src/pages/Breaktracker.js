import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const BreakTracker = () => {
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60 * 60);
  const [timerId, setTimerId] = useState(null);
  const [breaks, setBreaks] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const token = localStorage.getItem("token");

  const getAuthHeaders = () => ({
    headers: { Authorization: `${token}` },
  });

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const fetchBreaks = async (date = getCurrentDate()) => {
    try {
      const url = date
        ? `${process.env.REACT_APP_BACKEND_URL}/breaks/filter?date=${date}`
        : `${process.env.REACT_APP_BACKEND_URL}/breaks`;

      const response = await axios.get(url, getAuthHeaders());
      setBreaks(response.data);
    } catch (error) {
      console.error("Error fetching breaks:", error);
    }
  };

  const calculateRemainingTime = () => {
    const startTime = localStorage.getItem("breakStartTime");
    if (startTime) {
      const elapsedTime = Math.floor((Date.now() - Number(startTime)) / 1000);
      const totalTime = localStorage.getItem("remainingTime") || 60 * 60;
      const updatedTime = Math.max(totalTime - elapsedTime, 0);
      setRemainingTime(updatedTime);

      if (updatedTime === 0) {
        handleStop();
      }
    }
  };

  const handleStart = async () => {
    if (!isBreakActive) {
      try {
        const startTime = Date.now();
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/breaks`,
          { start_time: new Date().toISOString() },
          getAuthHeaders()
        );

        setIsBreakActive(true);
        localStorage.setItem("isBreakActive", "true");
        localStorage.setItem("breakStartTime", startTime.toString());
        localStorage.setItem("remainingTime", remainingTime.toString());
      } catch (error) {
        console.error("Error starting break:", error);
      }
    }
  };

  const handleStop = async () => {
    if (isBreakActive) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/breaks`,
          { end_time: new Date().toISOString() },
          getAuthHeaders()
        );

        setIsBreakActive(false);
        localStorage.removeItem("isBreakActive");
        localStorage.removeItem("breakStartTime");
      } catch (error) {
        console.error("Error stopping break:", error);
      }
    }
  };

  const handleReset = async () => {
    try {
      setIsBreakActive(false);
      setRemainingTime(60 * 60);
      localStorage.removeItem("isBreakActive");
      localStorage.removeItem("breakStartTime");
      localStorage.setItem("remainingTime", "3600");

      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/breaks`,
        { end_time: new Date().toISOString() },
        getAuthHeaders()
      );

      fetchBreaks();
    } catch (error) {
      console.error("Error resetting break:", error);
    }
  };

  useEffect(() => {
    fetchBreaks();

    if (localStorage.getItem("isBreakActive") === "true") {
      setIsBreakActive(true);
      calculateRemainingTime();
    }

    const visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        calculateRemainingTime();
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler);

    const timer = setInterval(() => {
      if (isBreakActive) {
        calculateRemainingTime();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, [isBreakActive]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFilterDate(newDate);
    fetchBreaks(newDate);
  };

  return (
    <Box sx={{ flex: 1, p: 3, bgcolor: "#F9FAFB", borderRadius: "8px", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" color="#006A67">
        Break Tracker
      </Typography>

      {/* Timer Display */}
      <Box sx={{ mt: 2, p: 2, bgcolor: "#E0F2F1", borderRadius: "8px" }}>
        <Typography variant="h6" color="#00796B">
          {`Remaining Time: ${Math.floor(remainingTime / 60)}m ${Math.floor(
            remainingTime % 60
          )}s`}
        </Typography>
        <Typography variant="body2" sx={{ color: "#757575" }}>
          {isBreakActive ? "Break is running..." : "Break is paused"}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={(remainingTime / 3600) * 100}
          sx={{ mt: 1, height: 10, borderRadius: 5 }}
        />
      </Box>

      {/* Buttons and Date Filter in One Row */}
      {/* Buttons and Date Filter Row */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Start/Stop Buttons */}
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#388E3C" },
              mr: 2,
            }}
            disabled={isBreakActive}
            onClick={handleStart}
          >
            Start Break
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F44336",
              "&:hover": { backgroundColor: "#D32F2F" },
            }}
            disabled={!isBreakActive}
            onClick={handleStop}
          >
            Stop Break
          </Button>
        </Box>

        <Box>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#FF9800",
      "&:hover": { backgroundColor: "#F57C00" },
      mt: 2,
    }}
    onClick={handleReset}
  >
    Reset Timer
  </Button>
</Box>


        {/* Date Filter */}
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h7" color="#00796B" sx={{ display: "block", mb: 1 }}>
            Filter Breaks by Date
          </Typography>
          <TextField
            type="date"
            value={filterDate}
            onChange={handleDateChange}
            sx={{ width: "200px" }}
          />
        </Box>
      </Box>


      {/* Break Records Table */}
      <Typography variant="h5" sx={{ mt: 4, color: "#006A67" }}>
        Break Records
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: "8px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#E0F2F1" }}>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Duration (minutes)</TableCell>
              <TableCell>Exceeded Time (minutes)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {breaks.map((b, i) => (
              <TableRow key={i}>
                <TableCell>{new Date(b.start_time).toLocaleString()}</TableCell>
                <TableCell>
                  {b.end_time ? new Date(b.end_time).toLocaleString() : "Ongoing"}
                </TableCell>
                <TableCell>
                {b.duration ? Math.ceil(b.duration / 60) : 0} min

                </TableCell>
                <TableCell>
                  {b.exceeded_time ? Math.floor(b.exceeded_time / 60) : 0} min
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BreakTracker;
