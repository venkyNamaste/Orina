const express = require("express");
const PromptsModel = require("../models/prompts");
require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const groqRouter = express.Router();

// Generate Job Description
groqRouter.post("/generate-jd", async (req, res) => {
  try {
    const { input } = req.body;

    const prompt = await PromptsModel.findOne({});
    const finalPrompt = prompt.prompt1;

    const messages = [
      { role: "system", content: finalPrompt },
      { role: "user", content: input },
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile", // Replace with your preferred model
    });

    res.json({ generatedText: response.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error in Groq API:", error.message);
    res.status(500).json({ error: "Failed to generate JD" });
  }
});

// Identify Skills and Client Requirements
groqRouter.post("/identify-skills", async (req, res) => {
  try {
    const { input } = req.body;

    const prompt = await PromptsModel.findOne({});
    const finalPrompt = prompt.prompt2;

    const messages = [
      { role: "system", content: finalPrompt },
      { role: "user", content: input },
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    res.json({ generatedText: response.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error identifying skills:", error.message);
    res.status(500).json({ error: "Failed to identify skills" });
  }
});

// Generate Boolean Analysis
groqRouter.post("/generate-boolean", async (req, res) => {
  try {
    const { input } = req.body;

    const prompt = await PromptsModel.findOne({});
    const finalPrompt = prompt.prompt3;

    const messages = [
      { role: "system", content: finalPrompt },
      { role: "user", content: input },
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    res.json({ generatedText: response.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error generating Boolean strings:", error.message);
    res.status(500).json({ error: "Failed to generate Boolean strings" });
  }
});

// Match Resume
groqRouter.post("/match-resume", async (req, res) => {
  try {
    const { jd, resume } = req.body;

    const prompt = await PromptsModel.findOne({});
    const finalPrompt = prompt.prompt4;

    const input = `JOB DESCRIPTION: ${jd}\nRESUME: ${resume}`;

    const messages = [
      { role: "system", content: finalPrompt },
      { role: "user", content: input },
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    res.json({ generatedText: response.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error in matching resume:", error.message);
    res.status(500).json({ error: "Failed to match resume" });
  }
});

module.exports = groqRouter;
