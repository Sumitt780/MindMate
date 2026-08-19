# MindMate

A mood-tracking app with a real backend and frontend. Each daily check-in
"plants" a bloom — color encodes mood, size encodes energy — so the past 30
days show up as a garden strip instead of a plain chart.

```
mindmate/
├── backend/     Express API, JWT auth, JSON file storage
└── frontend/    React (Vite) client
```

## 1. Run the backend

```bash
cd backend
npm install
cp .env.example .env      # edit JWT_SECRET for anything beyond local dev
npm run dev                # starts on http://localhost:4000
```

Data is stored in `backend/data/db.json`, created automatically on first run.
No database server required.

## 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev                 # starts on http://localhost:5173
```

Open http://localhost:5173 — the Vite dev server proxies `/api` requests to
the backend on port 4000 (see `frontend/vite.config.js`).

## 3. Use it

Create an account (username + password, min 6 characters), then check in.
Your token is kept in the browser's `localStorage` and sent as a Bearer
token on every request.

## API reference

All routes except `/auth/*` require `Authorization: Bearer <token>`.

| Method | Path                | Body                              | Description                    |
|--------|---------------------|------------------------------------|---------------------------------|
| POST   | /api/auth/register  | `{ username, password }`           | Create account, returns token   |
| POST   | /api/auth/login     | `{ username, password }`           | Returns token                   |
| GET    | /api/entries        | –                                   | All entries, keyed by date      |
| POST   | /api/entries        | `{ date, mood, energy, note }`     | Create/update an entry          |
| DELETE | /api/entries/:date  | –                                   | Delete an entry                 |
| GET    | /api/stats          | –                                   | Streak, top mood, 14-day trend  |

Valid `mood` values: `stormy`, `cloudy`, `still`, `sunny`, `radiant`
(1–5). `energy` is `1` (low), `2` (steady), or `3` (high).

## Notes for production use

- Swap the JSON file store (`backend/db.js`) for a real database (Postgres,
  SQLite via `better-sqlite3`, etc.) if you expect concurrent writers.
- Set a long, random `JWT_SECRET` in `.env` and don't commit `.env`.
- Add HTTPS / a reverse proxy (nginx, Caddy) in front of the Express app
  before exposing it publicly.
- Run `npm run build` in `frontend/` to produce a static bundle in
  `frontend/dist/`, then serve it from any static host or from Express
  itself.
