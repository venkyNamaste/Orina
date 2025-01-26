import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Toolbar, Typography, Grid } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUsers, FaEnvelope, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Explicitly register controllers at the component level
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    lvm: 0,
    sentEmail: 0,
    submitted: 0,
  });

  const StackedBarLineChart = ({ stats }) => {
    const data = {
      labels: ["Total", "LVM Status", "Sent Email", "Submitted"],
      datasets: [
        {
          type: "bar",
          label: "Candidates",
          data: [stats.total, stats.lvm, stats.sentEmail, stats.submitted],
          backgroundColor: "#00796B",
          borderColor: "#006A67",
          borderWidth: 1,
          barThickness: 90,
          maxBarThickness: 90,
        },
        {
          type: "line",
          label: "Trend",
          data: [stats.total, stats.lvm, stats.sentEmail, stats.submitted],
          borderColor: "#00A896",
          borderWidth: 2,
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: "#4DD0D0",
          pointBorderColor: "#00A896",
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Candidate Statistics" },
      },
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
        },
      },
    };
  
    return (
      <Box
        sx={{
          mt: 5,
          p: 3,
          backgroundColor: "#E0F2F1",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "80%",
          margin: "0 auto",
          height: "400px",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#006A67", fontWeight: "bold" }}>
          Candidate Statistics
        </Typography>
        <Chart type="bar" data={data} options={options} />
      </Box>
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        const config = { headers: { Authorization: token } };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/dashboard`, config);
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchStats = async (date) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: token } };

    try {
      const [totalRes, lvmRes, emailRes, submittedRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/candidate/stats/total?date=${date}`, config),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/candidate/stats/status/lvm?date=${date}`, config),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/candidate/stats/status/sent email?date=${date}`, config),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/candidate/stats/status/submitted?date=${date}`, config),
      ]);

      setStats({
        total: totalRes.data.count || 0,
        lvm: lvmRes.data.count || 0,
        sentEmail: emailRes.data.count || 0,
        submitted: submittedRes.data.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats(selectedDate.toISOString().split("T")[0]);
  }, [selectedDate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#F5F5F5",
          p: 3,
          pt: 1,
          minHeight: "100vh",
        }}
      >
        {/* Welcome Message */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            background: "linear-gradient(to right, #008F8B, #00B0AC)",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome back, {user?.name || "User"}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Here's what's happening with your recruitment process.
          </Typography>
        </Box>

        {/* Styled Date Picker */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 4,
          }}
        >
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="custom-date-picker"
            style={{
              border: "1px solid #00B0AC",
              borderRadius: "4px",
              padding: "6px",
            }}
          />
        </Box>

        {/* Four Stat Boxes in One Row */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={3}>
            <StatBox
              icon={<FaUsers size={32} />}
              label="Total Candidates"
              value={stats.total}
              bgColor="#00796B"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <StatBox
              icon={<FaCheckCircle size={32} />}
              label="Candidates with LVM Status"
              value={stats.lvm}
              bgColor="#00A896"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <StatBox
              icon={<FaEnvelope size={32} />}
              label="Candidates Sent Email"
              value={stats.sentEmail}
              bgColor="#4DD0D0"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <StatBox
              icon={<FaFileAlt size={32} />}
              label="Candidates with Submitted Status"
              value={stats.submitted}
              bgColor="#A8E6E4"
            />
          </Grid>
        </Grid>

        {/* Bar Chart */}
        <StackedBarLineChart stats={stats} />
      </Box>
    </Box>
  );
};

// StatBox Component
const StatBox = ({ icon, label, value, bgColor }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      borderRadius: "8px",
      background: bgColor,
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      height: "100px",
      justifyContent: "start",
    }}
  >
    <Box sx={{ fontSize: 28, mr: 2 }}>{icon}</Box>
    <Box>
      <Typography variant="h6" sx={{ opacity: 0.9 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default Dashboard;
