const express = require("express");
const { readDb } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

const MOOD_VALUES = { stormy: 1, cloudy: 2, still: 3, sunny: 4, radiant: 5 };

function formatKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

router.get("/", (req, res) => {
  const db = readDb();
  const entries = db.entries[req.userId] || {};

  // current streak (counts today if logged, otherwise checks back from yesterday)
  let streak = 0;
  let cursor = new Date();
  if (!entries[formatKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  while (entries[formatKey(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // most common mood this calendar month
  const now = new Date();
  const tally = {};
  Object.entries(entries).forEach(([key, e]) => {
    const dt = new Date(`${key}T00:00:00`);
    if (dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear()) {
      tally[e.mood] = (tally[e.mood] || 0) + 1;
    }
  });
  const topEntry = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  const topMood = topEntry ? topEntry[0] : null;

  // last 14 days for trend, last 7 for average
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const dt = new Date();
    dt.setDate(dt.getDate() - i);
    const key = formatKey(dt);
    days.push({ key, entry: entries[key] || null });
  }
  const trend14 = days.filter((d) => d.entry).map((d) => MOOD_VALUES[d.entry.mood]);
  const last7 = days.slice(-7).filter((d) => d.entry);
  const avg7 = last7.length
    ? (last7.reduce((sum, d) => sum + MOOD_VALUES[d.entry.mood], 0) / last7.length).toFixed(1)
    : null;

  res.json({ streak, topMood, trend14, avg7 });
});

module.exports = router;
