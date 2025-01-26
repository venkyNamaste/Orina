import React from "react";
import { Box, Typography } from "@mui/material";
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

export default StackedBarLineChart;
