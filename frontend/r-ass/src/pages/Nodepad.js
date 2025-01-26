import React, { useState, useEffect } from "react";
import { Box, Typography, TextareaAutosize } from "@mui/material";

const Notepad = () => {
  const token = localStorage.getItem("token");
  const [note, setNote] = useState("");

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch Note
  const fetchNote = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note/`, {
        method: "GET",
        ...getAuthHeaders(),
      });

      if (response.ok) {
        const result = await response.json();
        setNote(result.text || "");
      } else {
        console.error("Failed to fetch note:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  // Save Note
  const saveNote = async (text) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note/save`, {
        method: "POST",
        ...getAuthHeaders(),
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        console.error("Failed to save note:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  // Auto-save on changes
  useEffect(() => {
    const timer = setTimeout(() => saveNote(note), 1000);
    return () => clearTimeout(timer);
  }, [note]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F9FAFB",
        p: 2,
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="#006A67" mb={2}>
        📝 Notepad
      </Typography>
      <Box
        sx={{
          width: "80%",
          height: "80vh",
          padding: "10px",
          borderRadius: "16px",
          background: "linear-gradient(to bottom, #FFFFFF, #F1F1F1)",
          boxShadow: `
      0 4px 8px rgba(0, 0, 0, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.8),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1)
    `,
          border: "1px solid #E0E0E0",
          overflow: "hidden",
          position: "relative",
          '&:hover': {
            boxShadow: `
        0 8px 16px rgba(0, 0, 0, 0.15),
        inset 0 4px 6px rgba(255, 255, 255, 0.8),
        inset 0 -4px 6px rgba(0, 0, 0, 0.1)
      `,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto", // Enable scrolling for the entire note area
          }}
        >
          <TextareaAutosize
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Start typing here..."
            style={{
              width: "100%",
              minHeight: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              resize: "none",
              overflow: "auto",
              background: "transparent",
            }}
          />
        </Box>
      </Box>

      <Typography variant="caption" color="#757575" mt={2}>
        💾 Your notes are auto-saved every 2 seconds.
      </Typography>
    </Box>
  );
};

export default Notepad;
