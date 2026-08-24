const express = require("express");
const axios = require("axios");

const router = express.Router();

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";


router.post("/chat", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Message text is required."
      });
    }

    const response = await axios.post(
      `${AI_SERVICE_URL}/chat`,
      {
        text: text.trim()
      },
      {
        timeout: 60000
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(
      "AI Service Error:",
      error.response?.data || error.message
    );

    res.status(502).json({
      error: "AI service is unavailable."
    });
  }
});


module.exports = router;