import { useState, useEffect, useCallback } from "react";
import {
  Flower2,
  Loader2,
  Menu,
  Bell,
  X,
  CheckCircle2,
  Sparkles,
  Flame,
} from "lucide-react";

import {
  api,
  getToken,
  getUsername,
  setSession,
} from "./api";

import { formatKey } from "./constants";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import CheckIn from "./components/CheckIn";
import AIChat from "./components/AIChat";
import GardenStrip from "./components/GardenStrip";
import Insights from "./components/Insights";
import History from "./components/History";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

export default function App() {
  const [authed, setAuthed] = useState(!!getToken());
  const [loading, setLoading] = useState(true);

  const [entries, setEntries] = useState({});
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const [activeItem, setActiveItem] =
    useState("Dashboard");

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const todayKey = formatKey(new Date());
  const username = getUsername();

  const todayEntry = entries[todayKey];

  /*
   * =========================
   * Notifications
   * =========================
   */

  const notifications = [];

  if (!todayEntry) {
    notifications.push({
      id: "checkin",
      icon: Sparkles,
      title: "Daily check-in",
      text: "Take a moment to check in with yourself today.",
      type: "reminder",
    });
  } else {
    notifications.push({
      id: "checked-in",
      icon: CheckCircle2,
      title: "You're checked in",
      text: "Your reflection for today has been saved.",
      type: "success",
    });
  }

  if (stats?.streak > 1) {
    notifications.push({
      id: "streak",
      icon: Flame,
      title: `${stats.streak}-day streak`,
      text: "Keep checking in to continue your rhythm.",
      type: "streak",
    });
  }

  const hasNotifications =
    notifications.length > 0;

  /*
   * =========================
   * Load dashboard data
   * =========================
   */

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [entriesRes, statsRes] =
        await Promise.all([
          api.getEntries(),
          api.getStats(),
        ]);

      setEntries(entriesRes);
      setStats(statsRes);
    } catch (err) {
      if (
        err.message
          ?.toLowerCase()
          .includes("token")
      ) {
        setSession(null, null);
        setAuthed(false);
      } else {
        setError(
          err.message ||
            "Unable to load your MindMate data."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * =========================
   * Authentication
   * =========================
   */

  useEffect(() => {
    if (authed) {
      loadAll();
    } else {
      setLoading(false);
    }
  }, [authed, loadAll]);

  /*
   * =========================
   * Save today's check-in
   * =========================
   */

  const handleSaveEntry = async (payload) => {
    try {
      setError(null);

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
    } catch (err) {
      setError(
        err.message ||
          "Unable to save your check-in."
      );

      throw err;
    }
  };

  /*
   * =========================
   * Delete journal entry
   * =========================
   */

  const handleDeleteEntry = async (date) => {
    try {
      setError(null);

      await api.deleteEntry(date);

      setEntries((prev) => {
        const next = { ...prev };

        delete next[date];

        return next;
      });

      const statsRes = await api.getStats();
      setStats(statsRes);
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete this entry."
      );
    }
  };

  /*
   * =========================
   * Logout
   * =========================
   */

  const handleLogout = () => {
    setSession(null, null);

    setAuthed(false);

    setEntries({});
    setStats(null);
    setError(null);

    setActiveItem("Dashboard");
  };

  /*
   * =========================
   * Navigation
   * =========================
   */

  const handleNavigation = (item) => {
    setActiveItem(item);
    setMobileSidebarOpen(false);

    const sectionMap = {
      Dashboard: "dashboard",
      Journal: "journal",
      "Chat with AI": "ai-chat",
      "My Garden": "garden",
      Insights: "insights",
      History: "history",
      Profile: "profile",
      Settings: "settings",
    };

    const target = sectionMap[item];

    if (!target) {
      return;
    }

    setTimeout(() => {
      const element =
        document.getElementById(target);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  /*
   * =========================
   * Notification navigation
   * =========================
   */

  const handleNotificationClick = (
    notification
  ) => {
    setNotificationsOpen(false);

    if (
      notification.id === "checkin"
    ) {
      handleNavigation("Journal");
    }

    if (
      notification.id === "streak"
    ) {
      handleNavigation("Insights");
    }
  };

  /*
   * =========================
   * Login screen
   * =========================
   */

  if (!authed) {
    return (
      <Login
        onAuthed={() => setAuthed(true)}
      />
    );
  }

  /*
   * =========================
   * Loading screen
   * =========================
   */

  if (loading) {
    return (
      <div
        className="mm-shell"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <Loader2
          className="mm-spin"
          size={24}
          color="var(--primary)"
        />
      </div>
    );
  }

  /*
   * =========================
   * Main Application
   * =========================
   */

  return (
    <div className="mm-shell">

      <Sidebar
        activeItem={activeItem}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        username={username}
        mobileOpen={mobileSidebarOpen}
        onClose={() =>
          setMobileSidebarOpen(false)
        }
      />

      {/* Mobile Header */}

      <header className="mm-mobile-header">

        <button
          type="button"
          className="mm-mobile-menu"
          onClick={() =>
            setMobileSidebarOpen(true)
          }
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className="mm-mobile-brand">
          <Flower2
            size={19}
            color="var(--gold)"
          />

          <span>MindMate</span>
        </div>

        <button
          type="button"
          className={`mm-mobile-bell ${
            hasNotifications
              ? "has-notification"
              : ""
          }`}
          onClick={() =>
            setNotificationsOpen(
              (open) => !open
            )
          }
          aria-label="Notifications"
          aria-expanded={notificationsOpen}
        >
          <Bell size={19} />
        </button>

      </header>

      <main className="mm-main">

        {/* Dashboard Header */}

        <section
          id="dashboard"
          className="mm-dashboard-header"
        >

          <div>

            <p className="mm-dashboard-eyebrow">
              {new Date().toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>

            <h1 className="mm-dashboard-title">
              Good{" "}
              {new Date().getHours() < 12
                ? "morning"
                : new Date().getHours() < 18
                  ? "afternoon"
                  : "evening"}
              , {username || "there"}!
            </h1>

            <p className="mm-dashboard-subtitle">
              Take a moment to check in with
              yourself today.
            </p>

          </div>

          <div className="mm-dashboard-actions">

            {/* Notification */}

            <div className="mm-notification-wrapper">

              <button
                type="button"
                className={`mm-notification-btn ${
                  hasNotifications
                    ? "has-notification"
                    : ""
                }`}
                onClick={() =>
                  setNotificationsOpen(
                    (open) => !open
                  )
                }
                aria-label="Notifications"
                aria-expanded={
                  notificationsOpen
                }
              >
                <Bell size={18} />
              </button>

              {notificationsOpen && (
                <div className="mm-notification-panel">

                  <div className="mm-notification-panel-header">
                    <div>
                      <strong>
                        Notifications
                      </strong>

                      <span>
                        {notifications.length}{" "}
                        {notifications.length === 1
                          ? "update"
                          : "updates"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNotificationsOpen(
                          false
                        )
                      }
                      aria-label="Close notifications"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="mm-notification-list">

                    {notifications.map(
                      (notification) => {
                        const Icon =
                          notification.icon;

                        return (
                          <button
                            type="button"
                            key={
                              notification.id
                            }
                            className="mm-notification-item"
                            onClick={() =>
                              handleNotificationClick(
                                notification
                              )
                            }
                          >

                            <div
                              className={`mm-notification-item-icon ${notification.type}`}
                            >
                              <Icon size={15} />
                            </div>

                            <div>
                              <strong>
                                {
                                  notification.title
                                }
                              </strong>

                              <span>
                                {
                                  notification.text
                                }
                              </span>
                            </div>

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            </div>

            <div className="mm-profile-chip">

              <div className="mm-profile-avatar">
                {(username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span>
                {username || "User"}
              </span>

            </div>

          </div>

        </section>

        {/* Error */}

        {error && (
          <div className="mm-error">
            {error}
          </div>
        )}

        {/* Dashboard Grid */}

        <div className="mm-dashboard-grid">

          <div className="mm-dashboard-main-column">

            <section
              id="journal"
              className="mm-dashboard-section"
            >
              <CheckIn
                existingToday={
                  entries[todayKey]
                }
                onSave={handleSaveEntry}
              />
            </section>

            <section
              id="ai-chat"
              className="mm-dashboard-section"
            >
              <AIChat />
            </section>

            <section
              id="history"
              className="mm-dashboard-section"
            >
              <History
                entries={entries}
                onDelete={
                  handleDeleteEntry
                }
              />
            </section>

            <section
              id="profile"
              className="mm-dashboard-section"
            >
              <Profile />
            </section>

            <section
              id="settings"
              className="mm-dashboard-section"
            >
              <Settings />
            </section>

          </div>

          <aside className="mm-dashboard-side-column">

            <section
              id="garden"
              className="mm-dashboard-section"
            >
              <GardenStrip
                entries={entries}
              />
            </section>

            <section
              id="insights"
              className="mm-dashboard-section"
            >
              <Insights
                stats={stats}
              />
            </section>

          </aside>

        </div>

        <footer className="mm-footer">

          <div className="mm-footer-flower">
            <Flower2 size={16} />
          </div>

          <p>
            Your wellness journey is private
            and belongs to you.
          </p>

        </footer>

      </main>
    </div>
  );
}