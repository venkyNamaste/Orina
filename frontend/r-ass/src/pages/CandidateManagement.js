import React, { useEffect, useState } from "react";
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
    Pagination,
    TextField,
    Modal,
    Typography,
    Select,
    MenuItem,
    CircularProgress,
    InputAdornment,
} from "@mui/material";
import { FaSearch, FaMapMarkerAlt, FaFilter, FaUserPlus, FaPhone } from "react-icons/fa";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from "@mui/material/LinearProgress";


const CandidateManagement = () => {
    const [candidates, setCandidates] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState("");
    const [candidateForm, setCandidateForm] = useState({
        name: "",
        email: "",
        contact: "",
        position: "",
        location: "",
        status: "",
        notes: "",
        pickupDateTime: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [candidateId, setCandidateId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [positionSearch, setPositionSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [lastEnteredValues, setLastEnteredValues] = useState({
        position: "",
        location: "",
        jobid: "",
    });
    const [isJDModalOpen, setIsJDModalOpen] = useState(false);
    const [jobDescription, setJobDescription] = useState(""); // To store JD
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [contactSearch, setContactSearch] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [estimatedProcessingTime, setEstimatedProcessingTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadState, setUploadState] = useState(""); // "uploading", "processing", "completed"
    const [processingMessage, setProcessingMessage] = useState("");






    // Toastify Config
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    const notifyInfo = (message) => toast.info(message);



    const handleNotesModalClose = () => setIsNotesModalOpen(false);

    const handleModalClose = () => setIsModalOpen(false);

    // Handle Notes Modal
    const handleNotesModalOpen = (note) => {
        setCurrentNote(note);
        setIsNotesModalOpen(true);
    };




    // Fetch candidates from API
    const fetchCandidates = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/candidate`, {
                headers: { Authorization: token },
                params: {
                    page,
                    limit: 20,
                    position: positionSearch,
                    status: statusFilter,
                    location: locationSearch, // Pass location filter to backend
                    contact: contactSearch,
                },
            });
            console.log("response.data.candidates", response.data.candidates)
            // Filter location on frontend
            const filteredCandidates = response.data.candidates.filter((candidate) =>
                candidate.location.toLowerCase().includes(locationSearch.toLowerCase()) &&
                candidate.contact.toLowerCase().includes(contactSearch.toLowerCase())
            );
            // setCandidates(filteredCandidates);
            setCandidates(response.data.candidates);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            notifyError("Failed to fetch candidates!");
            console.error("Error fetching candidates:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const modalStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: "20vw",
        maxHeight: "100vh",
        overflowY: "auto",
        '@media (max-width: 768px)': {
            width: "90vw", // Adjust for smaller devices
        },
    };



    // Handle Modal Open/Close
    // Handle Modal Open/Close
    const handleModalOpen = (candidate = null) => {
        if (candidate) {
            setCandidateForm(candidate);
            setEditMode(true);
            setCandidateId(candidate._id);
        } else {
            const lastEntered = JSON.parse(localStorage.getItem("lastEnteredCandidate")) || {};
            setCandidateForm({
                name: "",
                email: "",
                contact: "",
                position: lastEntered.position || "",
                location: lastEntered.location || "",
                status: "",
                jobid: lastEntered.jobid || "",
                pickupDateTime: "",
            });
            setEditMode(false);
        }
        setIsModalOpen(true);
    };



    // Add or Update Candidate
    // Add or Update Candidate
    const handleSaveCandidate = async () => {
        try {
            const token = localStorage.getItem("token");

            if (editMode) {
                await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/candidate/${candidateId}`,
                    candidateForm,
                    { headers: { Authorization: token } }
                );
                notifySuccess("Candidate updated successfully!");
            } else {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/candidate/save`,
                    candidateForm,
                    { headers: { Authorization: token } }
                );

                // Update LocalStorage
                localStorage.setItem("lastEnteredCandidate", JSON.stringify({
                    position: candidateForm.position,
                    location: candidateForm.location,
                    jobid: candidateForm.jobid,
                }));

                notifySuccess("Candidate added successfully!");
            }

            if(candidateForm.pickupDateTime){
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/tasks/save`,
                    candidateForm,
                    { headers: { Authorization: token } }
                );
            }

            fetchCandidates();
            handleModalClose();
        } catch (error) {
            notifyError("Failed to save candidate. Please enter a unique email address.");
            console.error("Error saving candidate:", error);
        }
    };

    // Handle Pagination
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Fetch candidates on page load and page/search change
    useEffect(() => {
        fetchCandidates();
    }, [page, positionSearch, statusFilter, locationSearch, contactSearch]);

    const handleUploadFile = async () => {
        if (!selectedFile) {
            notifyInfo("Please select an Excel file to upload.");
            return;
        }

        setIsUploadModalOpen(true);
        setUploadState("uploading"); // Show uploading phase
        setProcessingMessage("Uploading your file...");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/candidate/upload`,
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProcessingMessage(`Uploading your file... ${progress}%`);
                    },
                }
            );

            setUploadState("processing");
            setProcessingMessage("Processing your data, please wait...");

            // Simulate backend processing delay (1 sec per 10 rows)
            const totalRows = response.data.totalRows || 100; // Default fallback
            const estimatedTime = Math.ceil(totalRows / 10);

            await new Promise((resolve) => setTimeout(resolve, estimatedTime * 1000));

            setUploadState("completed");
            setProcessingMessage("Upload and processing completed successfully!");
            notifySuccess("File uploaded and processed successfully!");
            fetchCandidates(); // Refresh the candidate list
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadState("");
            setProcessingMessage("Failed to upload or process file.");
            notifyError("Failed to upload file. Please try again.");
        } finally {
            setSelectedFile(null);
        }
    };


    const getStatusColor = (status) => {
        switch (status) {
            case "LVM":
                return "#FFC107"; // Yellow
            case "Sent email":
                return "#03A9F4"; // Blue
            case "Interested":
                return "#4CAF50"; // Green
            case "Not Interested":
                return "#F44336"; // Red
            case "Call back":
                return "#b240ff"; // purple
            case "Do not contact":
                return "#D22B2B"; // red
            case "Submitted":
                return "#3F51B5"; // Indigo
            case "Interviewed":
                return "#8E24AA"; // Purple
            case "Placed":
                return "#8BC34A"; // Light Green
            default:
                return "#BDBDBD"; // Default Grey
        }
    };
    return (
        <Box sx={{ display: "flex", bgcolor: "#F5F5F5", height: "100vh" }}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#F5F5F5",
                    p: 3,
                    minHeight: "100vh",
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
                        Candidate Management
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#00A896",
                            "&:hover": { backgroundColor: "#008F8B" },
                        }}
                        startIcon={<FaUserPlus />}
                        onClick={() => handleModalOpen()}
                    >
                        Add Candidate
                    </Button>
                </Box>


                {/* Filters Section */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        mb: 3,
                        background: "#E0F2F1",
                        p: 2,
                        borderRadius: "8px",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Left Side Filters */}
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", flexGrow: 1 }}>
                        {/* Search by Position */}
                        <TextField
                            label="Search by Position"
                            variant="outlined"
                            size="small"
                            value={positionSearch}
                            onChange={(e) => setPositionSearch(e.target.value)}
                            sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaSearch />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Search by Location */}
                        <TextField
                            label="Search by Location"
                            variant="outlined"
                            size="small"
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                            sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaMapMarkerAlt />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Status Filter */}
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            variant="outlined"
                            size="small"
                            displayEmpty
                            sx={{ backgroundColor: "#fff", borderRadius: "4px", width: "200px" }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <FaFilter />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="" disabled>
                                Select a status
                            </MenuItem>
                            <MenuItem value="">All Status</MenuItem>
                            <MenuItem value="LVM">📞 LVM</MenuItem>
                            <MenuItem value="Sent email">📧 Sent email</MenuItem>
                            <MenuItem value="Interested">✅ Interested</MenuItem>
                            <MenuItem value="Not Interested">❌ Not Interested</MenuItem>
                            <MenuItem value="Call back">📆 Call back</MenuItem>
                            <MenuItem value="Do not contact">🚫 Do not contact</MenuItem>
                            <MenuItem value="Submitted">📄 Submitted</MenuItem>
                            <MenuItem value="Interviewed">🗣️ Interviewed</MenuItem>
                            <MenuItem value="RTR">📧 RTR</MenuItem>
                            <MenuItem value="Placed">🎉 Placed</MenuItem>
                            <MenuItem value="Indeed">💼 Indeed</MenuItem>
                        </Select>
                        <TextField
                            label="Search by Contact"
                            variant="outlined"
                            size="small"
                            value={contactSearch}
                            onChange={(e) => setContactSearch(e.target.value)}
                            sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaPhone />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Reset Filters */}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#4DD0D0",
                                "&:hover": { backgroundColor: "#00B0AC" },
                            }}
                            onClick={() => {
                                setPositionSearch("");
                                setLocationSearch("");
                                setStatusFilter("");
                                setContactSearch("");
                            }}
                        >
                            Reset Filters
                        </Button>
                    </Box>

                    {/* Right Side - Upload Excel Button */}
                    <Box sx={{ textAlign: "right" }}>
                        <Tooltip
                            title="Ensure your Excel fields match our fields. Exact order isn’t necessary, but field names must align."
                            placement="top"
                            arrow
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#00796B",
                                    "&:hover": { backgroundColor: "#005A4A" },
                                    color: "white",
                                    marginLeft: "auto", // Pushes button to the right
                                }}
                                onClick={() => setIsUploadModalOpen(true)}
                            >
                                Upload Excel
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>


                {/* Table Section */}
                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#E0F2F1" }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Job ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : candidates.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <Typography variant="body1" sx={{ color: "#757575", padding: 2 }}>
                                                No Data Available
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    candidates.map((candidate) => {
                                        const normalizedCandidate = Object.keys(candidate).reduce((acc, key) => {
                                            acc[key.toLowerCase()] = candidate[key];
                                            return acc;
                                        }, {});

                                        return (
                                            <TableRow key={candidate._id}>
                                                <TableCell>
                                                    {new Date(candidate.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "2-digit",
                                                    })}
                                                </TableCell>
                                                <TableCell>{normalizedCandidate.name}</TableCell>
                                                <TableCell>{normalizedCandidate.email}</TableCell>
                                                <TableCell>{normalizedCandidate.contact}</TableCell>
                                                <TableCell>{normalizedCandidate.position}</TableCell>
                                                <TableCell>{normalizedCandidate.location}</TableCell>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Box
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: 1,
                                                                backgroundColor: getStatusColor(candidate.status),
                                                                marginRight: 1,
                                                            }}
                                                        />
                                                        {candidate.status}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{candidate.jobid || "N/A"}</TableCell>
                                                <TableCell>
                                                    <Button size="small" onClick={() => handleModalOpen(candidate)}>
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>


                        </Table>
                    </TableContainer>
                )}

                {/* Pagination */}
                <Box mt={2} pb={2} display="flex" justifyContent="center">
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                </Box>

                <Modal open={isModalOpen} onClose={handleModalClose}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "white",
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 24,
                            width: 400,
                        }}
                    >
                        {/* Modal Header with Reset Button */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {editMode ? "Edit Candidate" : "Add Candidate"}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => {
                                    localStorage.removeItem("lastEnteredCandidate");
                                    setCandidateForm({
                                        name: "",
                                        email: "",
                                        contact: "",
                                        position: "",
                                        location: "",
                                        status: "",
                                        jobid: "",
                                        pickupDateTime: "",
                                    });
                                    notifyInfo("Form data values have been reset!");
                                }}
                            >
                                Reset Form
                            </Button>
                        </Box>

                        {/* Form Fields */}
                        <TextField
                            fullWidth
                            label="Name"
                            value={candidateForm.name}
                            onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            value={candidateForm.email}
                            onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Contact"
                            value={candidateForm.contact}
                            onChange={(e) => setCandidateForm({ ...candidateForm, contact: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            value={candidateForm.position}
                            onChange={(e) => setCandidateForm({ ...candidateForm, position: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            value={candidateForm.location}
                            onChange={(e) => setCandidateForm({ ...candidateForm, location: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Job ID"
                            value={candidateForm.jobid}
                            onChange={(e) => setCandidateForm({ ...candidateForm, jobid: e.target.value })}
                            margin="normal"
                        />
                        <Select
                            fullWidth
                            value={candidateForm.status}
                            onChange={(e) =>
                                setCandidateForm({
                                    ...candidateForm,
                                    status: e.target.value,
                                    ...(e.target.value !== "Call back" && { pickupDateTime: "" }),
                                })
                            }
                            margin="normal"
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Select a status
                            </MenuItem>
                            <MenuItem value="LVM">LVM</MenuItem>
                            <MenuItem value="Sent email">Sent email</MenuItem>
                            <MenuItem value="Interested">Interested</MenuItem>
                            <MenuItem value="Not Interested">Not Interested</MenuItem>
                            <MenuItem value="Call back">Call back</MenuItem>
                            <MenuItem value="Do not contact">Do not contact</MenuItem>
                            <MenuItem value="Submitted">Submitted</MenuItem>
                            <MenuItem value="Interviewed">Interviewed</MenuItem>
                            <MenuItem value="Placed">Placed</MenuItem>
                            <MenuItem value="RTR">RTR</MenuItem>
                            <MenuItem value="Indeed">Indeed</MenuItem>
                        </Select>

                        {candidateForm.status === "Call back" && (
                            <TextField
                                fullWidth
                                label="Pickup Date and Time"
                                type="datetime-local"
                                value={candidateForm.pickupDateTime || ""}
                                onChange={(e) =>
                                    setCandidateForm({
                                        ...candidateForm,
                                        pickupDateTime: e.target.value,
                                    })
                                }
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}

                        {candidateForm.status === "RTR" && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#00796B",
                                    "&:hover": { backgroundColor: "#005A4A" },
                                    mt: 2,
                                }}
                                onClick={() => {
                                    const recipient = candidateForm.email || "";
                                    const subject = `RTR - Right To Represent -  ${candidateForm.position} - ${candidateForm.jobid}`;
                                    const content = `Hello ${candidateForm.name},\n\nPlease confirm ASAP.`;

                                    if (!candidateForm.email) {
                                        alert("Recipient email is missing. Please fill in the email field.");
                                        return;
                                    }

                                    const mailtoLink = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
                                        subject
                                    )}&body=${encodeURIComponent(content)}`;

                                    window.location.href = mailtoLink;
                                }}
                            >
                                SEND EMAIL
                            </Button>
                        )}

                        {/* Save Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSaveCandidate}
                            sx={{
                                backgroundColor: "#4DD0D0",
                                "&:hover": { backgroundColor: "#00B0AC" },
                                marginTop: 2,
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Modal>

                <Modal open={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
                    <Box sx={modalStyles}>
                        <Typography variant="h6" gutterBottom>
                            {uploadState === "completed"
                                ? "Upload Complete"
                                : "Upload Excel File"}
                        </Typography>

                        {/* Uploading State */}
                        {uploadState === "uploading" && (
                            <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                                <CircularProgress />
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    {processingMessage}
                                </Typography>
                            </Box>
                        )}

                        {/* Processing State */}
                        {uploadState === "processing" && (
                            <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                                <CircularProgress color="secondary" />
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    {processingMessage}
                                </Typography>
                            </Box>
                        )}

                        {/* Completed State */}
                        {uploadState === "completed" && (
                            <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#4CAF50",
                                        fontWeight: "bold",
                                        marginBottom: 2,
                                    }}
                                >
                                    🎉 Success!
                                </Typography>
                                <Typography variant="body1">{processingMessage}</Typography>
                            </Box>
                        )}

                        {/* File Selection - Default State */}
                        {uploadState === "" && (
                            <>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    style={{
                                        margin: "20px 0",
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        width: "100%",
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#4DD0D0",
                                        "&:hover": { backgroundColor: "#00B0AC" },
                                        marginTop: 2,
                                    }}
                                    onClick={handleUploadFile}
                                >
                                    Upload
                                </Button>
                            </>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );


};

export default CandidateManagement;
