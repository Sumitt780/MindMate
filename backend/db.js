const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "data", "db.json");

function ensureDb() {
  const dir = path.dirname(DB_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify(
        {
          users: [],
          entries: {},
          chats: {},
        },
        null,
        2
      )
    );
  }
}

function readDb() {
  ensureDb();

  const db = JSON.parse(
    fs.readFileSync(DB_PATH, "utf-8")
  );

  // Keep existing database compatible
  if (!db.users) {
    db.users = [];
  }

  if (!db.entries) {
    db.entries = {};
  }

  if (!db.chats) {
    db.chats = {};
  }

  return db;
}

function writeDb(data) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(data, null, 2)
  );
}

module.exports = {
  readDb,
  writeDb,
};