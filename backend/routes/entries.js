const express = require("express");
const { readDb, writeDb } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

const MOOD_IDS = ["stormy", "cloudy", "still", "sunny", "radiant"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/entries -> { "2026-08-19": { mood, energy, note, timestamp, updated }, ... }
router.get("/", (req, res) => {
  const db = readDb();
  res.json(db.entries[req.userId] || {});
});

// POST /api/entries -> upsert an entry for a given date
router.post("/", (req, res) => {
  const { date, mood, energy, note } = req.body || {};
  if (!date || !DATE_RE.test(date)) {
    return res.status(400).json({ error: "date must be in YYYY-MM-DD format" });
  }
  if (!MOOD_IDS.includes(mood)) {
    return res.status(400).json({ error: `mood must be one of: ${MOOD_IDS.join(", ")}` });
  }

  const db = readDb();
  if (!db.entries[req.userId]) db.entries[req.userId] = {};

  const existing = db.entries[req.userId][date];
  const entry = {
    mood,
    energy: Number(energy) >= 1 && Number(energy) <= 3 ? Number(energy) : 2,
    note: String(note || "").slice(0, 2000),
    timestamp: existing?.timestamp || Date.now(),
    updated: Date.now(),
  };
  db.entries[req.userId][date] = entry;
  writeDb(db);
  res.json(entry);
});

// DELETE /api/entries/:date
router.delete("/:date", (req, res) => {
  const { date } = req.params;
  const db = readDb();
  if (db.entries[req.userId]) delete db.entries[req.userId][date];
  writeDb(db);
  res.json({ ok: true });
});

module.exports = router;
