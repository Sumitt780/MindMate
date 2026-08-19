const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readDb, writeDb } = require("../db");
const { SECRET } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const db = readDb();
  const taken = db.users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (taken) return res.status(409).json({ error: "That username is already taken" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    username,
    passwordHash,
  };
  db.users.push(user);
  db.entries[user.id] = {};
  writeDb(db);

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "30d" });
  res.status(201).json({ token, username: user.username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  const db = readDb();
  const user = db.users.find((u) => u.username.toLowerCase() === (username || "").toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid username or password" });

  const valid = await bcrypt.compare(password || "", user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid username or password" });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "30d" });
  res.json({ token, username: user.username });
});

module.exports = router;
