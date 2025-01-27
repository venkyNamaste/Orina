import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    TablePagination,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0); // Current page (zero-based index)
    const [rowsPerPage, setRowsPerPage] = useState(15); // Rows per page
    const [totalTasks, setTotalTasks] = useState(0); // Total number of tasks

    // Fetch Tasks
    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
                headers: { Authorization: token },
                params: {
                    page: page + 1, // Backend might expect 1-based index
                    limit: rowsPerPage,
                },
            });
            console.log("response.data", response.data)
            setTasks(response.data.tasks || []);
            setTotalTasks(response.data.total || 0);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, rowsPerPage]);

    // Handle Page Change
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // Handle Rows Per Page Change
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const formatUTC = (dateTime) => {
        return new Date(dateTime).toLocaleString("en-GB", {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#F5F5F5",
                    p: 3,
                    borderRadius: "8px",
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#00796B",
                        color: "#fff",
                        borderRadius: "8px",
                        p: 2,
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Task Management
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                        Total Tasks: {totalTasks}
                    </Typography>
                </Box>

                {/* Tasks Table */}
                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={3}>
                        <CircularProgress />
                    </Box>
                ) : tasks.length > 0 ? (
                    <>
                        <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#E0F2F1" }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Pickup DateTime</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tasks.map((task) => (
                                        <TableRow
                                            key={task._id}
                                            sx={{ "&:nth-of-type(odd)": { backgroundColor: "#F9FBFB" } }}
                                        >
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.position}</TableCell>
                                            <TableCell>{formatUTC(task.pickupDateTime)}</TableCell>
                                            <TableCell>{task.location}</TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "inline-block",
                                                        backgroundColor: getStatusColor(task.status),
                                                        color: "#fff",
                                                        borderRadius: "4px",
                                                        px: 1.5,
                                                        py: 0.5,
                                                        fontSize: "0.875rem",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {task.status}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <TablePagination
                                component="div"
                                count={totalTasks}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                rowsPerPageOptions={[15, 30, 50]}
                            />
                        </Box>
                    </>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "center", mt: 4, color: "#666", fontStyle: "italic" }}
                    >
                        No tasks available at the moment.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

// Helper Function for Status Colors
const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
            return "#FFC107"; // Yellow
        case "In Progress":
            return "#03A9F4"; // Blue
        case "Completed":
            return "#4CAF50"; // Green
        case "Failed":
            return "#F44336"; // Red
        default:
            return "#BDBDBD"; // Default Grey
    }
};

export default TaskManagement;
