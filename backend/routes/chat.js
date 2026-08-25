const express = require("express");
const { readDb, writeDb } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

// GET /api/chat
// Get current user's chat history
router.get("/", (req, res) => {
  const db = readDb();

  const chats = db.chats[req.userId] || [];

  res.json(chats);
});

// POST /api/chat
// Save one chat message
router.post("/", (req, res) => {
  const {
    role,
    text,
    emotion,
    sentiment,
  } = req.body || {};

  if (!role || !["user", "ai"].includes(role)) {
    return res.status(400).json({
      error: "role must be either user or ai",
    });
  }

  if (!text || !String(text).trim()) {
    return res.status(400).json({
      error: "text is required",
    });
  }

  const db = readDb();

  if (!db.chats[req.userId]) {
    db.chats[req.userId] = [];
  }

  const message = {
    role,
    text: String(text).trim().slice(0, 5000),
    timestamp: Date.now(),
  };

  if (role === "ai") {
    if (emotion) message.emotion = String(emotion);
    if (sentiment) message.sentiment = String(sentiment);
  }

  db.chats[req.userId].push(message);

  writeDb(db);

  res.json(message);
});

// DELETE /api/chat
// Clear current user's chat history
router.delete("/", (req, res) => {
  const db = readDb();

  db.chats[req.userId] = [];

  writeDb(db);

  res.json({ ok: true });
});

module.exports = router;