const express = require('express');
const router = express.Router();
require('dotenv').config();

// Correct the import and initialization
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/fix-accessibility', async (req, res) => {
  const { htmlCode } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an accessibility expert. Review the following HTML and:
1. Suggest a fixed version with improved accessibility.
2. Provide a related accessibility guide URL.

HTML:
${htmlCode}

Respond in this format:
1. Fixed HTML snippet:
<your fixed code here>

2. Guide link:
<insert helpful WCAG/ARIA URL>
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const [suggestionBlock, guideBlock] = text.split("2. Guide link:");

    res.json({
      suggestion: suggestionBlock.replace("1. Fixed HTML snippet:", "").trim(),
      guide: guideBlock?.trim() || "",
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "AI failed to generate a fix." });
  }
});

module.exports = router;
