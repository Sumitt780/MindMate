import { useState, useEffect, useCallback } from "react";
import { Flower2, Loader2 } from "lucide-react";
import { api, getToken, getUsername, setSession } from "./api";
import { formatKey } from "./constants";

import Login from "./components/Login";
import CheckIn from "./components/CheckIn";
import AIChat from "./components/AIChat";
import GardenStrip from "./components/GardenStrip";
import Insights from "./components/Insights";
import History from "./components/History";

export default function App() {
  const [authed, setAuthed] = useState(!!getToken());
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState({});
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const todayKey = formatKey(new Date());

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [entriesRes, statsRes] = await Promise.all([
        api.getEntries(),
        api.getStats(),
      ]);

      setEntries(entriesRes);
      setStats(statsRes);
    } catch (err) {
      if (err.message.includes("token")) {
        setSession(null, null);
        setAuthed(false);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      loadAll();
    } else {
      setLoading(false);
    }
  }, [authed, loadAll]);

  const handleSaveEntry = async (payload) => {
    const saved = await api.saveEntry({
      date: todayKey,
      ...payload,
    });

    setEntries((prev) => ({
      ...prev,
      [todayKey]: saved,
    }));

    const statsRes = await api.getStats();
    setStats(statsRes);
  };

  const handleDeleteEntry = async (date) => {
    await api.deleteEntry(date);

    setEntries((prev) => {
      const next = { ...prev };
      delete next[date];
      return next;
    });

    const statsRes = await api.getStats();
    setStats(statsRes);
  };

  const handleLogout = () => {
    setSession(null, null);
    setAuthed(false);
    setEntries({});
    setStats(null);
  };

  if (!authed) {
    return <Login onAuthed={() => setAuthed(true)} />;
  }

  if (loading) {
    return (
      <div
        className="mm-shell"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader2
          className="mm-spin"
          size={22}
          color="var(--panel)"
        />
      </div>
    );
  }

  return (
    <div className="mm-shell">
      {/* Header */}
      <div className="mm-header">
        <div className="mm-header-inner">
          <div className="mm-logo">
            <Flower2
              size={22}
              color="var(--mood-4)"
            />

            <span className="mm-display">
              MindMate
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              className="mm-mono"
              style={{
                fontSize: 12,
                color: "var(--mist)",
              }}
            >
              {new Date().toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>

            <button
              className="mm-logout"
              onClick={handleLogout}
            >
              Sign out ({getUsername()})
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="mm-main">
        {error && (
          <div className="mm-error">
            {error}
          </div>
        )}

        {/* Daily Check-in */}
        <CheckIn
          existingToday={entries[todayKey]}
          onSave={handleSaveEntry}
        />

        {/* AI Chat */}
        <AIChat />

        {/* Garden */}
        <GardenStrip entries={entries} />

        {/* Insights */}
        <Insights stats={stats} />

        {/* History */}
        <History
          entries={entries}
          onDelete={handleDeleteEntry}
        />

        {/* Footer */}
        <p
          style={{
            fontSize: 12,
            textAlign: "center",
            color: "#A39CA9",
            paddingBottom: 8,
          }}
        >
          Entries are stored on your own backend and tied
          to your account only.
        </p>
      </div>
    </div>
  );
}