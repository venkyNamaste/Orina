import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const JobAnalyser = () => {
  const [jdInput, setJdInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [extraFields, setExtraFields] = useState([""]);
  const [jdResponse, setJdResponse] = useState("");
  const [skillsResponse, setSkillsResponse] = useState("");
  const [booleanResponse, setBooleanResponse] = useState("");
  const [resumeMatchResponse, setResumeMatchResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currentLoadingTab, setCurrentLoadingTab] = useState(null); // To track active loading tab

  // ✅ Restore State from localStorage on Load
  useEffect(() => {
    const savedJdInput = localStorage.getItem("jdInput");
    const savedResumeInput = localStorage.getItem("resumeInput");
    const savedExtraFields = localStorage.getItem("extraFields");
    const savedJdResponse = localStorage.getItem("jdResponse");
    const savedSkillsResponse = localStorage.getItem("skillsResponse");
    const savedBooleanResponse = localStorage.getItem("booleanResponse");
    const savedResumeMatchResponse = localStorage.getItem("resumeMatchResponse");
    const savedActiveTab = localStorage.getItem("activeTab");

    if (savedJdInput) setJdInput(savedJdInput);
    if (savedResumeInput) setResumeInput(savedResumeInput);
    if (savedExtraFields) setExtraFields(JSON.parse(savedExtraFields));
    if (savedJdResponse) setJdResponse(savedJdResponse);
    if (savedSkillsResponse) setSkillsResponse(savedSkillsResponse);
    if (savedBooleanResponse) setBooleanResponse(savedBooleanResponse);
    if (savedResumeMatchResponse) setResumeMatchResponse(savedResumeMatchResponse);
    if (savedActiveTab) setActiveTab(Number(savedActiveTab));
  }, []);

  // ✅ Save Input to localStorage on Change
  useEffect(() => {
    localStorage.setItem("jdInput", jdInput);
  }, [jdInput]);

  useEffect(() => {
    localStorage.setItem("resumeInput", resumeInput);
  }, [resumeInput]);

  useEffect(() => {
    localStorage.setItem("extraFields", JSON.stringify(extraFields));
  }, [extraFields]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleFieldChange = (index, value) => {
    const updatedFields = [...extraFields];
    updatedFields[index] = value;
    setExtraFields(updatedFields);
  };

  const handleAddField = () => setExtraFields([...extraFields, ""]);

  const handleGenerate = async (endpoint, setter, storageKey, loadingTab) => {
    setLoading(true);
    setCurrentLoadingTab(loadingTab);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${endpoint}`, {
        input: `${jdInput}\nAdditional Details: ${extraFields.join(", ")}`,
      });
      setter(response.data.generatedText);

      // ✅ Save the response to localStorage
      localStorage.setItem(storageKey, response.data.generatedText);
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
    }
    setLoading(false);
    setCurrentLoadingTab(null);
  };

  const handleResumeMatch = async () => {
    setLoading(true);
    setCurrentLoadingTab("resumeMatch");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/match-resume`,
        {
          jd: jdInput,
          resume: resumeInput,
        }
      );
      setResumeMatchResponse(response.data.generatedText);

      // ✅ Save the response to localStorage
      localStorage.setItem("resumeMatchResponse", response.data.generatedText);
    } catch (error) {
      console.error("Error calling match-resume:", error);
    }
    setLoading(false);
    setCurrentLoadingTab(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleResetForm = () => {
    setJdInput("");
    setResumeInput("");
    setExtraFields([""]);
    setJdResponse("");
    setSkillsResponse("");
    setBooleanResponse("");
    setResumeMatchResponse("");
    setActiveTab(0);

    localStorage.removeItem("jdInput");
    localStorage.removeItem("resumeInput");
    localStorage.removeItem("extraFields");
    localStorage.removeItem("jdResponse");
    localStorage.removeItem("skillsResponse");
    localStorage.removeItem("booleanResponse");
    localStorage.removeItem("resumeMatchResponse");
    localStorage.removeItem("activeTab");

    console.info("Form has been reset!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        bgcolor: "#F9FAFB",
        minHeight: "70vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "99%",
          maxWidth: "2000px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "#00796B",
            color: "#fff",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              🛠️ Job Analyser
            </Typography>
            <Typography variant="subtitle2">
              Analyze job descriptions, identify skills, and generate booleans effortlessly.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleResetForm}
            sx={{
              backgroundColor: "#FFCDD2",
              "&:hover": { backgroundColor: "#EF9A9A" },
            }}
          >
            Reset
          </Button>
        </Box>

        {/* JD Input Section */}
        <Box sx={{ p: 3, backgroundColor: "#E0F2F1" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Enter Job Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder="Enter JD Responsibilities here..."
            value={jdInput}
            onChange={(e) => setJdInput(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "#fff",
              borderRadius: "4px",
            }}
          />

          {/* Action Buttons */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              disabled={loading && currentLoadingTab === "jd"}
              onClick={() => handleGenerate("generate-jd", setJdResponse, "jdResponse", "jd")}
              sx={{ mr: 2 }}
            >
              {loading && currentLoadingTab === "jd" ? <CircularProgress size={24} /> : "Format JD"}
            </Button>
            <Button
              variant="contained"
              disabled={loading && currentLoadingTab === "skills"}
              onClick={() =>
                handleGenerate("identify-skills", setSkillsResponse, "skillsResponse", "skills")
              }
              sx={{ mr: 2 }}
            >
              {loading && currentLoadingTab === "skills" ? (
                <CircularProgress size={24} />
              ) : (
                "Identify Skills"
              )}
            </Button>
            <Button
              variant="contained"
              disabled={loading && currentLoadingTab === "boolean"}
              onClick={() =>
                handleGenerate("generate-boolean", setBooleanResponse, "booleanResponse", "boolean")
              }
            >
              {loading && currentLoadingTab === "boolean" ? (
                <CircularProgress size={24} />
              ) : (
                "Generate Booleans"
              )}
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Formatted JD" />
          <Tab label="Identified Skills" />
          <Tab label="Boolean Results" />
          <Tab label="Resume Match" />
        </Tabs>

        {/* Results */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <ReactQuill theme="snow" value={jdResponse} readOnly />}
          {activeTab === 1 && <Typography>{skillsResponse}</Typography>}
          {activeTab === 2 && <Typography>{booleanResponse}</Typography>}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Enter Resume Text
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Paste Resume Text here..."
                value={resumeInput}
                onChange={(e) => setResumeInput(e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
              <Button
                variant="contained"
                disabled={loading && currentLoadingTab === "resumeMatch"}
                onClick={handleResumeMatch}
              >
                {loading && currentLoadingTab === "resumeMatch" ? (
                  <CircularProgress size={24} />
                ) : (
                  "Match Resume"
                )}
              </Button>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Response:</Typography>
                <Typography>{resumeMatchResponse}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default JobAnalyser;
